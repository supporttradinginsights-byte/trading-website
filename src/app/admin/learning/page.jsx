'use client';

import { useEffect, useState } from 'react';
import { useAdminAuth } from '../../../lib/useAdminAuth';
import { adminApi } from '../../../lib/adminApi';

const EMPTY_LESSON = {
  title: '',
  category: '',
  summary: '',
  contentHtml: '',
  videoUrl: '',
  pdfUrl: '',
  coverImageUrl: '',
  pdfDownloadEnabled: false,
  order: 0,
  status: 'draft',
};

export default function AdminLearningPage() {
  const { adminFetch } = useAdminAuth();

  const [categories, setCategories] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [lessonForm, setLessonForm] = useState(null); // null = hidden, object = editing/creating
  const [uploading, setUploading] = useState(false);

  async function loadAll() {
    setLoading(true);
    setError('');
    try {
      const [catRes, lessonRes] = await Promise.all([
        adminApi.listCategories(adminFetch),
        adminApi.listLessons(adminFetch),
      ]);
      setCategories(catRes.categories);
      setLessons(lessonRes.lessons);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAll();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleCreateCategory(e) {
    e.preventDefault();
    setError('');
    try {
      await adminApi.createCategory(adminFetch, newCategory);
      setNewCategory({ name: '', description: '' });
      loadAll();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDeleteCategory(id) {
    if (!confirm('Delete this category? It must have no lessons in it.')) return;
    setError('');
    try {
      await adminApi.deleteCategory(adminFetch, id);
      loadAll();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleTogglePublished(cat) {
    try {
      await adminApi.updateCategory(adminFetch, cat.id, { published: !cat.published });
      loadAll();
    } catch (err) {
      setError(err.message);
    }
  }

  function openNewLesson() {
    setLessonForm({ ...EMPTY_LESSON, category: categories[0]?.id || categories[0]?._id || '' });
  }

  function openEditLesson(lesson) {
    setLessonForm({
      _id: lesson._id,
      title: lesson.title,
      category: lesson.category?._id || lesson.category,
      summary: lesson.summary || '',
      contentHtml: lesson.contentHtml || '',
      videoUrl: lesson.videoUrl || '',
      pdfUrl: lesson.pdfUrl || '',
      coverImageUrl: lesson.coverImageUrl || '',
      pdfDownloadEnabled: !!lesson.pdfDownloadEnabled,
      order: lesson.order || 0,
      status: lesson.status,
    });
  }

  async function handleSaveLesson(e) {
    e.preventDefault();
    setError('');
    const { _id, ...body } = lessonForm;
    try {
      if (_id) await adminApi.updateLesson(adminFetch, _id, body);
      else await adminApi.createLesson(adminFetch, body);
      setLessonForm(null);
      loadAll();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDeleteLesson(id) {
    if (!confirm('Delete this lesson?')) return;
    setError('');
    try {
      await adminApi.deleteLesson(adminFetch, id);
      loadAll();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleUpload(field, file) {
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const { url } = await adminApi.uploadFile(adminFetch, file);
      setLessonForm((f) => ({ ...f, [field]: url }));
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  const visibleLessons = selectedCategoryId
    ? lessons.filter((l) => (l.category?._id || l.category) === selectedCategoryId)
    : lessons;

  if (loading) return <p>Loading…</p>;

  return (
    <div>
      <p className="eyebrow">Admin</p>
      <h1>Learning center</h1>
      {error && <p style={{ color: 'var(--down)' }}>{error}</p>}

      {/* ── Categories ─────────────────────────────────────────────── */}
      <section style={{ marginTop: 32 }}>
        <h2>Categories</h2>
        <div style={{ display: 'grid', gap: 12, marginTop: 12 }}>
          {categories.map((c) => (
            <div
              key={c.id}
              className="card"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <div>
                <strong>{c.name}</strong>{' '}
                <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  /{c.slug}
                </span>
                <p style={{ fontSize: '0.85rem', margin: '4px 0 0' }}>
                  {c.lessonCount} lesson(s) · {c.published ? 'published' : 'hidden'}
                </p>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button type="button" className="btn btn-outline" onClick={() => handleTogglePublished(c)}>
                  {c.published ? 'Unpublish' : 'Publish'}
                </button>
                <button type="button" className="btn btn-outline" onClick={() => handleDeleteCategory(c.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
          {categories.length === 0 && <p>No categories yet — add one below.</p>}
        </div>

        <form onSubmit={handleCreateCategory} style={{ display: 'flex', gap: 12, marginTop: 16, maxWidth: 560 }}>
          <input
            placeholder="Category name"
            required
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
          />
          <button type="submit" className="btn btn-primary">Add category</button>
        </form>
      </section>

      {/* ── Lessons ────────────────────────────────────────────────── */}
      <section style={{ marginTop: 48 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Lessons</h2>
          <button type="button" className="btn btn-primary" onClick={openNewLesson} disabled={categories.length === 0}>
            + New lesson
          </button>
        </div>

        <select
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
          style={{ marginTop: 12, maxWidth: 280 }}
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
          {visibleLessons.map((l) => (
            <div
              key={l._id}
              className="card"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <div>
                <strong>{l.title}</strong>
                <p style={{ fontSize: '0.85rem', margin: '4px 0 0' }}>
                  {l.category?.name || '—'} · {l.status}
                </p>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button type="button" className="btn btn-outline" onClick={() => openEditLesson(l)}>Edit</button>
                <button type="button" className="btn btn-outline" onClick={() => handleDeleteLesson(l._id)}>Delete</button>
              </div>
            </div>
          ))}
          {visibleLessons.length === 0 && <p>No lessons yet.</p>}
        </div>
      </section>

      {/* ── Lesson editor ──────────────────────────────────────────── */}
      {lessonForm && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
            padding: '40px 20px', overflowY: 'auto', zIndex: 50,
          }}
        >
          <form
            onSubmit={handleSaveLesson}
            className="card"
            style={{ maxWidth: 640, width: '100%', display: 'grid', gap: 14 }}
          >
            <h3>{lessonForm._id ? 'Edit lesson' : 'New lesson'}</h3>

            <div>
              <label>Title</label>
              <input
                required
                value={lessonForm.title}
                onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
              />
            </div>

            <div>
              <label>Category</label>
              <select
                required
                value={lessonForm.category}
                onChange={(e) => setLessonForm({ ...lessonForm, category: e.target.value })}
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label>Summary</label>
              <input
                value={lessonForm.summary}
                onChange={(e) => setLessonForm({ ...lessonForm, summary: e.target.value })}
              />
            </div>

            <div>
              <label>Content (HTML)</label>
              <textarea
                rows={6}
                value={lessonForm.contentHtml}
                onChange={(e) => setLessonForm({ ...lessonForm, contentHtml: e.target.value })}
              />
            </div>

            <div>
              <label>YouTube video URL (optional)</label>
              <input
                value={lessonForm.videoUrl}
                onChange={(e) => setLessonForm({ ...lessonForm, videoUrl: e.target.value })}
              />
            </div>

            <div>
              <label>Cover image</label>
              {lessonForm.coverImageUrl && (
                <p style={{ fontSize: '0.8rem' }} className="mono">{lessonForm.coverImageUrl}</p>
              )}
              <input type="file" accept="image/*" onChange={(e) => handleUpload('coverImageUrl', e.target.files?.[0])} />
            </div>

            <div>
              <label>PDF attachment</label>
              {lessonForm.pdfUrl && <p style={{ fontSize: '0.8rem' }} className="mono">{lessonForm.pdfUrl}</p>}
              <input type="file" accept="application/pdf" onChange={(e) => handleUpload('pdfUrl', e.target.files?.[0])} />
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                <input
                  type="checkbox"
                  checked={lessonForm.pdfDownloadEnabled}
                  onChange={(e) => setLessonForm({ ...lessonForm, pdfDownloadEnabled: e.target.checked })}
                  style={{ width: 'auto' }}
                />
                Allow visitors to download this PDF
              </label>
            </div>

            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ flex: 1 }}>
                <label>Order</label>
                <input
                  type="number"
                  value={lessonForm.order}
                  onChange={(e) => setLessonForm({ ...lessonForm, order: Number(e.target.value) })}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label>Status</label>
                <select
                  value={lessonForm.status}
                  onChange={(e) => setLessonForm({ ...lessonForm, status: e.target.value })}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              <button type="submit" className="btn btn-primary" disabled={uploading}>
                {uploading ? 'Uploading…' : 'Save'}
              </button>
              <button type="button" className="btn btn-outline" onClick={() => setLessonForm(null)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
