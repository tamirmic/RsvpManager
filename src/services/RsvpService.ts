import { Player, RsvpEntry, RsvpStatus } from '../types';

export class RsvpService {
  private rsvpMap: Map<string, RsvpEntry> = new Map();

  addOrUpdateRsvp(player: Player, status: RsvpStatus): void {
    this.rsvpMap.set(player.id, { player, status });
  }

  getConfirmedAttendees(): Player[] {
    return Array.from(this.rsvpMap.values())
      .filter(entry => entry.status === 'Yes')
      .map(entry => entry.player);
  }

  getCounts(): { total: number; confirmed: number; declined: number } {
    let confirmed = 0;
    let declined = 0;

    for (const entry of this.rsvpMap.values()) {
      if (entry.status === 'Yes') confirmed++;
      else if (entry.status === 'No') declined++;
    }

    return {
      total: this.rsvpMap.size,
      confirmed,
      declined,
    };
  }

  getAllEntries(): RsvpEntry[] {
    return Array.from(this.rsvpMap.values());
  }
}