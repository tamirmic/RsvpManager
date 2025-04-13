import React, { useState } from 'react';
import { Player, RsvpStatus } from '../types';
import { RsvpService } from '../services/RsvpService';

const rsvpService = new RsvpService();

export const RsvpManager: React.FC = () => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState<RsvpStatus>('Maybe');
  const [entries, setEntries] = useState(rsvpService.getAllEntries());
  const [confirmed, setConfirmed] = useState<Player[]>([]);

  const handleSubmit = () => {
    const player: Player = { id: name.toLowerCase(), name };
    rsvpService.addOrUpdateRsvp(player, status);
    setEntries(rsvpService.getAllEntries());
    setName('');
    setStatus('Maybe');
  };

  const confirmedAttendees = () =>{
    const confirmedPlayers = rsvpService.getConfirmedAttendees();
    setConfirmed(confirmedPlayers);
  };

  const counts = rsvpService.getCounts();

  return (
    <div>
      <h2>RSVP Manager</h2>
      <input
        type="text"
        value={name}
        placeholder="Player Name"
        onChange={(e) => setName(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value as RsvpStatus)}>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
        <option value="Maybe">Maybe</option>
      </select>
      <button onClick={handleSubmit} disabled={!name.trim()}>Submit RSVP</button>

      <h3>Attendees</h3>
      {entries.length === 0 ? (
        <p style={{ color: '#888', fontStyle: 'italic' }}>
          No RSVPs yet — be the first to confirm!
        </p>
      ) : (
        <ul>
          {entries.map((entry) => (
            <li key={entry.player.id}>
              {entry.player.name}: {entry.status}
            </li>
          ))}
        </ul>
      )}

      <p>Confirmed: {counts.confirmed}</p>
      <p>Declined: {counts.declined}</p>
      <p>Total: {counts.total}</p>


      <h3>Confirmed Attendees List</h3>
      <button onClick={confirmedAttendees}>Get List</button>

      {confirmed.length > 0 && (
        <ul>
          {confirmed.map((player) => (
            <li key={player.id}>{player.name}</li>
          ))}
        </ul>
      )}


    </div>
  );
};