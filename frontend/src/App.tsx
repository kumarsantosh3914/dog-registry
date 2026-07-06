import { useState, useEffect, useCallback } from 'react';
import './App.css';

const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/dogs`;

interface Dog {
  _id: string;
  breed: string;
  subBreads: string[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error';
}

function App() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState(false);

  const [createBreed, setCreateBreed] = useState('');
  const [createSubBreeds, setCreateSubBreeds] = useState('');
  const [creating, setCreating] = useState(false);

  const [editDog, setEditDog] = useState<Dog | null>(null);
  const [editBreed, setEditBreed] = useState('');
  const [editSubBreeds, setEditSubBreeds] = useState('');
  const [updating, setUpdating] = useState(false);

  const [deleting, setDeleting] = useState<string | null>(null);

  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'error') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  }, []);

  /* ──── GET all dogs ──── */
  const fetchDogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(API_BASE);
      const json = await res.json();
      setDogs(json.data ?? []);
    } catch {
      showToast('Failed to fetch dogs', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchDogs();
  }, [fetchDogs]);


  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createBreed.trim()) return;
    setCreating(true);
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          breed: createBreed.trim(),
          subBreads: createSubBreeds
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean),
        }),
      });
      const json = await res.json();
      if (res.ok) {
        showToast(`Created "${json.data.breed}" successfully`, 'success');
        setCreateBreed('');
        setCreateSubBreeds('');
        fetchDogs();
      } else {
        showToast(json.message || 'Create failed', 'error');
      }
    } catch {
      showToast('Network error creating dog', 'error');
    } finally {
      setCreating(false);
    }
  };

  const openEdit = (dog: Dog) => {
    setEditDog(dog);
    setEditBreed(dog.breed);
    setEditSubBreeds(dog.subBreads.join(', '));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editDog || !editBreed.trim()) return;
    setUpdating(true);
    try {
      const res = await fetch(`${API_BASE}/${editDog._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          breed: editBreed.trim(),
          subBreads: editSubBreeds
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean),
        }),
      });
      const json = await res.json();
      if (res.ok) {
        showToast(`Updated "${json.data.breed}" successfully`, 'success');
        setEditDog(null);
        fetchDogs();
      } else {
        showToast(json.message || 'Update failed', 'error');
      }
    } catch {
      showToast('Network error updating dog', 'error');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleting(id);
    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (res.ok) {
        showToast('Dog deleted successfully', 'success');
        fetchDogs();
      } else {
        showToast(json.message || 'Delete failed', 'error');
      }
    } catch {
      showToast('Network error deleting dog', 'error');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <h1>🐕 Dog Registry</h1>
        <p>Manage your dog breed collection</p>
      </header>

      {/* Action Panels */}
      <div className="panels">
        {/* GET all dogs */}
        <div className="card">
          <div className="card-title">
            <span className="method-badge badge-get">GET</span>
            /api/v1/dogs
          </div>
          <button
            id="btn-fetch-dogs"
            className="btn btn-success"
            onClick={fetchDogs}
            disabled={loading}
          >
            {loading ? <span className="spinner" /> : null}
            {loading ? 'Fetching…' : 'Fetch All Dogs'}
          </button>
        </div>

        {/* POST create dog */}
        <div className="card">
          <div className="card-title">
            <span className="method-badge badge-post">POST</span>
            /api/v1/dogs
          </div>
          <form onSubmit={handleCreate}>
            <div className="form-group">
              <label htmlFor="create-breed">Breed</label>
              <input
                id="create-breed"
                type="text"
                placeholder="e.g. Golden Retriever"
                value={createBreed}
                onChange={(e) => setCreateBreed(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="create-sub-breeds">Sub-breeds (comma separated)</label>
              <input
                id="create-sub-breeds"
                type="text"
                placeholder="e.g. American, English, Canadian"
                value={createSubBreeds}
                onChange={(e) => setCreateSubBreeds(e.target.value)}
              />
            </div>
            <button
              id="btn-create-dog"
              type="submit"
              className="btn btn-primary"
              disabled={creating}
            >
              {creating ? <span className="spinner" /> : null}
              {creating ? 'Creating…' : 'Create Dog'}
            </button>
          </form>
        </div>
      </div>

      {/* Dogs Table */}
      <section className="dogs-section">
        <div className="section-header">
          <h2>All Dogs</h2>
          <span className="dog-count">{dogs.length} record{dogs.length !== 1 ? 's' : ''}</span>
        </div>

        <div className="dogs-table-wrapper">
          {dogs.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🐾</div>
              <p>{loading ? 'Loading…' : 'No dogs registered yet. Create one above!'}</p>
            </div>
          ) : (
            <table className="dogs-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Breed</th>
                  <th>Sub-breeds</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {dogs.map((dog) => (
                  <tr key={dog._id}>
                    <td className="id-cell" title={dog._id}>{dog._id}</td>
                    <td className="breed-cell">{dog.breed}</td>
                    <td>
                      <div className="sub-breeds-cell">
                        {dog.subBreads.length > 0
                          ? dog.subBreads.map((sb, i) => (
                            <span key={i} className="sub-breed-tag">{sb}</span>
                          ))
                          : <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>—</span>}
                      </div>
                    </td>
                    <td>
                      <div className="actions-cell">
                        <button
                          className="btn-icon edit"
                          title="Edit dog"
                          onClick={() => openEdit(dog)}
                        >
                          ✏️
                        </button>
                        <button
                          className="btn-icon delete"
                          title="Delete dog"
                          onClick={() => handleDelete(dog._id)}
                          disabled={deleting === dog._id}
                        >
                          {deleting === dog._id ? <span className="spinner" /> : '🗑️'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {/* Edit Modal */}
      {editDog && (
        <div className="modal-overlay" onClick={() => setEditDog(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>
              <span className="method-badge badge-put" style={{ marginRight: 8 }}>PUT</span>
              Update Dog
            </h3>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label htmlFor="edit-id">ID</label>
                <input id="edit-id" type="text" value={editDog._id} disabled />
              </div>
              <div className="form-group">
                <label htmlFor="edit-breed">Breed</label>
                <input
                  id="edit-breed"
                  type="text"
                  value={editBreed}
                  onChange={(e) => setEditBreed(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-sub-breeds">Sub-breeds (comma separated)</label>
                <input
                  id="edit-sub-breeds"
                  type="text"
                  value={editSubBreeds}
                  onChange={(e) => setEditSubBreeds(e.target.value)}
                />
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setEditDog(null)}
                >
                  Cancel
                </button>
                <button
                  id="btn-update-dog"
                  type="submit"
                  className="btn btn-warning"
                  disabled={updating}
                >
                  {updating ? <span className="spinner" /> : null}
                  {updating ? 'Updating…' : 'Update Dog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toasts */}
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.type}`}>
            {t.type === 'success' ? '✓' : '✗'} {t.message}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
