'use client';

import { useState } from 'react';
import { X, Clock, AlertCircle, CheckCircle } from 'lucide-react';

interface Ticket {
  _id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in-progress' | 'resolved';
  createdAt: string;
  createdBy: {
    name: string;
    email: string;
  };
  category?: string;
  roomNumber?: string;
  notes?: string;
}

interface RequestDetailsModalProps {
  ticket: Ticket | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (ticketId: string, newStatus: string, notes?: string) => Promise<void>;
}

export default function RequestDetailsModal({
  ticket,
  isOpen,
  onClose,
  onStatusChange,
}: RequestDetailsModalProps) {
  const [internalNotes, setInternalNotes] = useState(ticket?.notes || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');

  if (!isOpen || !ticket) return null;

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true);
    setUpdateMessage('');

    try {
      await onStatusChange(ticket._id, newStatus, internalNotes);
      setUpdateMessage('Status updated successfully!');
      setTimeout(() => {
        setUpdateMessage('');
        onClose();
      }, 1500);
    } catch (error) {
      setUpdateMessage('Failed to update status. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'bg-gray-100 text-gray-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Request Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Title and ID */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{ticket.title}</h3>
            <p className="text-sm text-gray-500 mt-1">ID: {ticket._id}</p>
          </div>

          {/* Status and Priority Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">Current Status</p>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(ticket.status)}`}>
                {ticket.status.toUpperCase().replace('-', ' ')}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">Priority</p>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(ticket.priority)}`}>
                {ticket.priority.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Description</p>
            <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{ticket.description}</p>
          </div>

          {/* Student Info */}
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Submitted By</p>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="font-medium text-gray-900">{ticket.createdBy.name}</p>
              <p className="text-sm text-gray-600">{ticket.createdBy.email}</p>
            </div>
          </div>

          {/* Category and Room */}
          {(ticket.category || ticket.roomNumber) && (
            <div className="grid grid-cols-2 gap-4">
              {ticket.category && (
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Category</p>
                  <p className="text-gray-900">{ticket.category}</p>
                </div>
              )}
              {ticket.roomNumber && (
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Room Number</p>
                  <p className="text-gray-900">{ticket.roomNumber}</p>
                </div>
              )}
            </div>
          )}

          {/* Created Date */}
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Created Date</p>
            <p className="text-gray-900">{new Date(ticket.createdAt).toLocaleString()}</p>
          </div>

          {/* Internal Notes */}
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Internal Notes</p>
            <textarea
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
              placeholder="Add internal notes or comments about this request..."
              className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Update Message */}
          {updateMessage && (
            <div
              className={`p-3 rounded-lg text-sm ${
                updateMessage.includes('success')
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}
            >
              {updateMessage}
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2 border-t border-gray-200 pt-6">
            <p className="text-sm font-medium text-gray-600 mb-3">Change Status</p>
            <div className="grid grid-cols-1 gap-2">
              {ticket.status === 'open' && (
                <button
                  onClick={() => handleStatusChange('in-progress')}
                  disabled={isUpdating}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
                >
                  <Clock className="w-4 h-4" />
                  Mark as In Progress
                </button>
              )}

              {ticket.status === 'in-progress' && (
                <>
                  <button
                    onClick={() => handleStatusChange('open')}
                    disabled={isUpdating}
                    className="w-full bg-yellow-600 hover:bg-yellow-700 disabled:bg-yellow-400 text-white font-medium py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4" />
                    Mark as Open
                  </button>
                  <button
                    onClick={() => handleStatusChange('resolved')}
                    disabled={isUpdating}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Mark as Resolved
                  </button>
                </>
              )}

              {ticket.status === 'resolved' && (
                <button
                  onClick={() => handleStatusChange('open')}
                  disabled={isUpdating}
                  className="w-full bg-yellow-600 hover:bg-yellow-700 disabled:bg-yellow-400 text-white font-medium py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
                >
                  <AlertCircle className="w-4 h-4" />
                  Reopen Request
                </button>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-full mt-3 bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-2 px-4 rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
