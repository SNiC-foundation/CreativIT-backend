/**
 *  SudoSOS back-end API service.
 *  Copyright (C) 2020  Study association GEWIS
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as published
 *  by the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import MailTemplate from './MailTemplate';
import MailContent from './MailContent';

interface TracksReminderOptions {
  name: string;
  url?: string;
}

const reminder = new MailContent<TracksReminderOptions>({
  getHTML: (context) => `
<p>Dear ${context.name},</p>
<p>Thank you for joining us on November 29th for the 2023 edition of SNiC: 
CreativIT! According to our administration you have not yet enrolled in any talks. 
Please keep in mind that this is possible until 23:59h this afternoon. 
Afterwards you will not be able to enroll anymore and you will be assigned to talks.</p>
<p>See you November 29th!</p>`,
  getSubject: () => 'Reminder to subscribe for the tracks',
  getText: (context) => `
Dear ${context.name},

Thank you for joining us on November 29th for the 2023 edition of SNiC: CreativIT! 
According to our administration you have not yet enrolled in any talks. 
Please keep in mind that this is possible until 23:59h this afternoon. 
Afterwards you will not be able to enroll anymore and you will be assigned to talks.

See you November 29th!`,
});

export default class TracksReminder extends MailTemplate<TracksReminderOptions> {
  public constructor(options: TracksReminderOptions) {
    const opt: TracksReminderOptions = {
      ...options,
    };
    if (!options.url) {
      opt.url = process.env.URL;
    }
    super(opt, reminder);
  }
}
