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
import Partner from '../../entities/Partner';

interface Track {
  beginTime: Date;
  endTime: Date;
  name: string;
  location: string;
}

interface FinalParticipantInfoParams {
  name: string;
  ticketCode: string;
  track1: Track | undefined;
  track2: Track | undefined;
  track3: Track | undefined;
  partners: Partner[];
  url?: string;
}

function formatTime(date: Date) {
  return date.toLocaleString('nl-NL', {
    timeStyle: 'short',
    timeZone: 'Europe/Amsterdam',
  });
}

function formatTrack(track?: Track) {
  return track ? `${formatTime(track.beginTime)} - ${formatTime(track.endTime)}: ${track.name} (${track.location})` : '??:?? - ??:??';
}

const reminder = new MailContent<FinalParticipantInfoParams>({
  getHTML: (context) => `
<p>Dear ${context.name},</p>

<p>We are looking forward to seeing you at CreativIT next week! In this email, we will give you an overview of all the last things you need to know for next week!</p>

<p><b>Program</b><br>
Your personal program is as follows:
<ul>
<li>09:15 - 10:30: Check-in</li>
<li>10:30 - 11:45: Creativity and Innovation: The Driving Forces of Progress (Copraloods)</li>
<li>${formatTrack(context.track1)}</li>
<li>13:15 - 14:15: Lunch</li>
<li>${formatTrack(context.track2)}</li>
<li>${formatTrack(context.track3)}</li>
<li>17:15 - 18:30: Code Like a DJ with Sonic Pi (Copraloods)</li>
<li>18:30 - 20:30: Dinner with drinks</li>
</ul>
Please make sure to visit the sessions you have signed up for, as all sessions are completely booked.</p>
 
<p>Lunch, dinner and drinks are all included in the event, you do not need to bring any food. You could optionally bring a water bottle. Additionally, the congress does not require you to bring a bag or a laptop.</p> 
<p>Note that this is a serious activity, so please dress appropriately and behave accordingly. Alcohol will be served during the dinner, but we expect you to know your limits.</p>
 
<p><b>Travel</b><br>
You should have received an email from your study association with the information on at what time your bus leaves and where you have to gather. If you do not have this information, please contact the board of your association. This bus will also bring you back to your city after the program ends. Note that the buses are all FULL, so please don’t join a bus from another city unless communicated with the board of your association.</p> 
<p>For members from Sticky and A-Eskwadraat, you can travel on your own directly to DeFabrique, Westkanaaldijk 7, 3542 DA Utrecht. You can arrive between 09:30 and 09:45.</p>
  
<p><b>Barcode and badge</b><br>
Your ticket code is: ${context.ticketCode}. Please bring this code to the conference. On your name badge a QR code will be included. You can use this QR code to share your information with companies you find interesting. If you allow a company to scan your QR, they receive your name, mail address and study program according to our privacy policy. You can also find the QR code on your profile on the CreativIT website.</p>
<p><img src="${context.url}/api/static/barcodes/${context.ticketCode}.png" alt="${context.ticketCode}"/><br></p>

<p><b>Partners</b><br>
SNiC 2023: CreativIT would not be possible without our partners. Below you can find a message from our Platinum and Gold partners.</p>

${context.partners.map((p) => `<hr>
<p style="white-space: pre-wrap">
<b><img width="200" src="${context.url}/api/static/${p.logoFilename}" alt="${p.name}"/></b><br>
${p.description}
</p><br>`).join(' ')}
<br>
<p>See you Wednesday at CreativIT!</p>`,
  getSubject: () => 'Final information for SNiC 2023: CreativIT',
  getText: (context) => `
Dear ${context.name},

We are looking forward to seeing you at CreativIT next week! In this email, we will give you an overview of all the last things you need to know for next week!

Program:
Your personal program is as follows:
09:15 - 10:30: Check-in
10:30 - 11:45: Creativity and Innovation: The Driving Forces of Progress (Copraloods)
${formatTrack(context.track1)}
13:15 - 14:15: Lunch
${formatTrack(context.track2)}
${formatTrack(context.track3)}
17:15 - 18:30: Code Like a DJ with Sonic Pi (Copraloods)
18:30 - 20:30: Dinner with drinks

Please make sure to visit the sessions you have signed up for, as all sessions are completely booked.
  
Lunch, dinner and drinks are all included in the event, you do not need to bring any food. You could optionally bring a water bottle. Additionally, the congress does not require you to bring a bag or a laptop.
Note that this is a serious activity, so please dress appropriately and behave accordingly. Alcohol will be served during the dinner, but we expect you to know your limits.
  
Travel:
You should have received an email from your study association with the information on at what time your bus leaves and where you have to gather. If you do not have this information, please contact the board of your association. This bus will also bring you back to your city after the program ends. Note that the buses are all FULL, so please don’t join a bus from another city unless communicated with the board of your association.
For members from Sticky and A-Eskwadraat, you can travel on your own directly to DeFabrique, Westkanaaldijk 7, 3542 DA Utrecht. You can arrive between 09:30 and 09:45.
  
Barcode and badge:
Your ticket code is: ${context.ticketCode}. Please bring this code to the conference. On your name badge a QR code will be included. You can use this QR code to share your information with companies you find interesting. If you allow a company to scan your QR, they receive your name, mail address and study program according to our privacy policy. You can also find the QR code on your profile on the CreativIT website.

Partners:
SNiC 2023: CreativIT would not be possible without our partners. Below you can find a message from our Platinum and Gold partners.

${context.partners.map((p) => `${p.name}
${p.description}`).join(`

`)}

See you Wednesday at CreativIT!`,
});

export default class FinalParticipantInfo extends MailTemplate<FinalParticipantInfoParams> {
  public constructor(options: FinalParticipantInfoParams) {
    const opt: FinalParticipantInfoParams = {
      ...options,
    };
    if (!options.url) {
      opt.url = process.env.URL;
    }
    super(opt, reminder);
  }
}
