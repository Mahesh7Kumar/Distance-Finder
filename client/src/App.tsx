import { useState } from "react";
import { useUsers } from "./hooks/useUsers";
import type { IUser } from "./types";
import * as svc from "./services/userService";
import { UserList } from "./components/UserList";
import { MapView } from "./components/MapView";
import { DistanceCheck } from "./components/DistanceCheck";
import { Modal } from "./components/ui/Modal";
import { Input } from "./components/ui/input.tsx";
import { Button } from "./components/ui/button.tsx";

export default function App() {
  const { users, setUsers, loading, refresh } = useUsers();
  const [center, setCenter] = useState({ latitude: 25.2048, longitude: 55.2708 });
  const [newUser, setNewUser] = useState({ name: "", latitude: 0, longitude: 0 } as IUser);
  const [editUser, setEditUser] = useState<IUser | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCreate = async () => {
    const created = await svc.createUser(newUser);
    setUsers(prev => [created, ...prev]);
    setNewUser({ name: "", latitude: 0, longitude: 0 } as IUser);
  };

  const handleEdit = (u: IUser) => {
    setEditUser(u);
    setModalOpen(true);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm("Delete user?")) return;
    await svc.deleteUser(id);
    setUsers(prev => prev.filter(p => p._id !== id));
  };

  const saveEdit = async () => {
    if (!editUser || !editUser._id) return;
    const updated = await svc.updateUser(editUser._id, editUser);
    setUsers(prev => prev.map(p => p._id === updated._id ? updated : p));
    setModalOpen(false);
    setEditUser(null);
  };

  return (
    <div className="min-h-screen p-8 bg-blue-950">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl text-amber-50 font-bold">Distance Finder</h1>
          <div className="flex gap-3">
            <Button onClick={() => setModalOpen(true)}>Check Distance</Button>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800 p-4 rounded-md border border-slate-700">
            <h2 className="text-lg text-amber-50 font-semibold mb-3">Add User</h2>
            <div className="space-y-2">
              <Input label="Name" value={newUser.name} onChange={e => setNewUser(prev => ({ ...prev, name: e.target.value }))} />
              <div className="grid grid-cols-2 gap-2">
                <Input label="Latitude" value={newUser.latitude} onChange={e => setNewUser(prev => ({ ...prev, latitude: parseFloat(e.target.value)  }))} />
                <Input label="Longitude" value={newUser.longitude} onChange={e => setNewUser(prev => ({ ...prev, longitude: parseFloat(e.target.value) || 0 }))} />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleCreate}>Create</Button>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 p-4 rounded-md border border-slate-700">
            <h2 className="text-lg text-amber-50 font-semibold mb-3">Current Center</h2>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <Input label="Latitude" value={center.latitude} onChange={e => setCenter(prev => ({ ...prev, latitude: parseFloat(e.target.value) || 0 }))} />
              <Input label="Longitude" value={center.longitude} onChange={e => setCenter(prev => ({ ...prev, longitude: parseFloat(e.target.value) || 0 }))} />
            </div>
            <div className="flex gap-2">
              <Button onClick={() => refresh()}>Refresh Users</Button>
            </div>
          </div>
        </section>

        <section className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg text-amber-50 font-semibold mb-3">Users List</h3>
            {loading ? <div className="text-amber-50">Loading...</div> : (
              <UserList users={users} onEdit={handleEdit} onDelete={(id) => handleDelete(id)} />
            )}
          </div>

          <div>
            <h3 className="text-lg text-amber-50 font-semibold mb-3">Map Preview</h3>
            <MapView center={center} users={users} maxRadiusKm={30} />
          </div>
        </section>

        {/* Distance modal */}
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Check Distance">
          <div className="space-y-4">
            <DistanceCheck initialLat={center.latitude} initialLon={center.longitude} onEditUser={u => { setEditUser(u); setModalOpen(true); }} onDeleteUser={(id) => handleDelete(id)} />
            <div>
              <h4 className="font-semibold text-amber-50 mb-2">Map Visual</h4>
              <MapView center={center} users={users} maxRadiusKm={30} />
            </div>
          </div>
        </Modal>

        {/* Edit modal */}
        <Modal open={!!editUser && modalOpen} onClose={() => { setEditUser(null); setModalOpen(false); }} title="Edit User">
          {editUser && (
            <div className="space-y-3">
              <Input label="Name" value={editUser.name} onChange={e => setEditUser({ ...editUser, name: e.target.value })} />
              <div className="grid grid-cols-2 gap-2">
                <Input label="Latitude" value={editUser.latitude} onChange={e => setEditUser({ ...editUser, latitude: parseFloat(e.target.value) || 0 })} />
                <Input label="Longitude" value={editUser.longitude} onChange={e => setEditUser({ ...editUser, longitude: parseFloat(e.target.value) || 0 })} />
              </div>
              <div className="flex gap-2">
                <Button onClick={saveEdit}>Save</Button>
                <Button onClick={() => { setEditUser(null); setModalOpen(false); }} className="bg-slate-700">Cancel</Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}
