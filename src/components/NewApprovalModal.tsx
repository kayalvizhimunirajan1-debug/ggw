import React, { useState } from 'react';
import { ApprovalCategory, ApprovalItem } from '../types';
import { X, Sparkles, AlertCircle } from 'lucide-react';

interface NewApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (item: Omit<ApprovalItem, 'id' | 'status'>) => void;
}

export const NewApprovalModal: React.FC<NewApprovalModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [childName, setChildName] = useState('Leo Miller');
  const [category, setCategory] = useState<ApprovalCategory>('pickup');
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [requestedBy, setRequestedBy] = useState('');
  const [urgency, setUrgency] = useState<'normal' | 'time_sensitive' | 'critical'>('time_sensitive');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !details.trim()) return;

    onSubmit({
      childName,
      childAge: '4 yrs',
      childRoom: 'Sunbeam Cubs (Room 2)',
      avatarPhotoUrl: childName.startsWith('Leo') 
        ? 'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=150&q=80'
        : childName.startsWith('Maya') 
        ? 'https://images.unsplash.com/photo-1595454223600-91fbdd77e583?auto=format&fit=crop&w=150&q=80'
        : childName.startsWith('Oliver') 
        ? 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=150&q=80'
        : 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=150&q=80',
      category,
      title,
      details,
      requestedBy: requestedBy || 'Parent Guardian',
      requestedTime: 'Just now',
      urgency,
    });

    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="new-gate-title"
      className="fixed inset-0 z-50 bg-stone-950/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="bg-[#FFFDF8] rounded-3xl p-6 sm:p-7 max-w-lg w-full border-2 border-amber-300 shadow-2xl relative my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-amber-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xs flex-shrink-0 bg-amber-50">
            <img 
              src="/src/assets/images/bear_mascot_avatar_1790413515209.jpg" 
              alt="Mascot Bear" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div>
            <h3 id="new-gate-title" className="font-swanky text-xl text-amber-950">
              Create New Sleeping-Bear Gate
            </h3>
            <p className="text-xs text-stone-500">
              The request will nestle into the board in a paused, sleeping state until deliberate signoff.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Child Selection */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Select Child:
            </label>
            <select
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-white border border-amber-200 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <option value="Leo Miller">Leo Miller (Cubby #1)</option>
              <option value="Maya Chen">Maya Chen (Cubby #2)</option>
              <option value="Oliver Patel">Oliver Patel (Cubby #3)</option>
              <option value="Zoe Washington">Zoe Washington (Cubby #4)</option>
              <option value="Noah Kim">Noah Kim (Cubby #5)</option>
              <option value="Emma Watson">Emma Watson (Cubby #6)</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Category:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'pickup', label: 'Alternate Pickup' },
                { id: 'allergy', label: 'Allergy / Snack' },
                { id: 'medication', label: 'Medication' },
                { id: 'fieldtrip', label: 'Field Trip' },
                { id: 'early_dismissal', label: 'Early Dismissal' },
                { id: 'nap_schedule', label: 'Nap Change' },
              ].map((cat) => (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => setCategory(cat.id as ApprovalCategory)}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold text-center transition-all cursor-pointer border ${
                    category === cat.id
                      ? 'bg-amber-200 text-amber-950 border-amber-400 shadow-2xs'
                      : 'bg-white text-stone-600 border-amber-100 hover:bg-amber-50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Approval Title:
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Grandma pickup at 3:30 PM with photo ID"
              className="w-full px-3.5 py-2 rounded-xl bg-white border border-amber-200 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          {/* Details */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Instruction Details & Safety Notes:
            </label>
            <textarea
              required
              rows={3}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Provide exact instructions, dosages, contact details, or safety rules..."
              className="w-full px-3.5 py-2 rounded-xl bg-white border border-amber-200 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
            />
          </div>

          {/* Requested By */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Requested By:
              </label>
              <input
                type="text"
                value={requestedBy}
                onChange={(e) => setRequestedBy(e.target.value)}
                placeholder="Parent name or Doctor"
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-amber-200 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Urgency Level:
              </label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value as 'normal' | 'time_sensitive' | 'critical')}
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-amber-200 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option value="normal">Normal</option>
                <option value="time_sensitive">Time Sensitive</option>
                <option value="critical">Critical Safety</option>
              </select>
            </div>
          </div>

          {/* Notice */}
          <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-2 text-xs text-amber-900 leading-snug">
            <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <span>
              This request will be spawned as a <strong>Sleeping Bear Cub</strong>. It cannot be approved by a reflex click; staff must hold "Tuck in" for 1.2s to sign off.
            </span>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 shadow-sm cursor-pointer"
            >
              Create Sleeping Gate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
