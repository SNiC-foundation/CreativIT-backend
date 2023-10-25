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

interface TicketActivatedParams {
  name: string;
  ticketCode: string;
  url?: string;
}

const ticketActivated = new MailContent<TicketActivatedParams>({
  getHTML: (context) => `
    <p>Dear ${context.name},</p>
    <p>We are happy to welcome you to CreativIT on the 29th of November!</p>
    <p>Your ticket code is: ${context.ticketCode}.</p>
    <p><img src="${context.url}/api/static/barcodes/${context.ticketCode}.png" alt="${context.ticketCode}"/></p>
    <p>Please bring this barcode to the conference.</p>
    <p>Before the conference starts you need to perform a few actions. Please read this email carefully.</p>
    <p>Firstly, please make sure your personal information is up to date and correct, your name will be used for a personal name badge. If applicable, also make sure to update your allergy information before the 1st of November. There will be sufficient vegetarian options available by default.</p>
    <p>Secondly, starting from Monday 25th of October at 12:00 the subscriptions will open for the conference program. You can find the program <a href="https://www.snic-creativit.nl/program">here</a>. You can choose yourself what talks you want to visit.</p>
    <p>Please subscribe before the 1st of November to get a personal program. If you have not subscribed for all rounds by then, you will be randomly assigned to the remaining spots.</p>
    <p>Lunch, dinner and drinks are all included in the price, you do not need to bring any food. Additionally, the conference does not require you to bring a bag or a laptop. Also, note that this is a serious activity so please dress appropriately.</p>
    <p>We look forward to seeing you at CreativIT!</p>`,
  getSubject: () => 'Important information regarding the SNiC 2023 CreativIT conference',
  getText: (context) => `
Dear ${context.name},

We are happy to welcome you to CreativIT on the 29th of November!

Your ticket code is: ${context.ticketCode}. Please bring this code to the conference.

Before the conference starts you need to perform a few actions. Please read this email carefully.

Firstly, please make sure your personal information is up to date and correct, your name will be used for a personal name badge. If applicable, also make sure to update your allergy information before the 1st of November. There will be sufficient vegetarian options available by default.

Secondly, starting from Monday 25th of October at 12:00 the subscriptions will open for the conference program. You can find the program on our website: www.snic-creativit.nl. You can choose yourself what talks you want to visit.

Please subscribe before the 1st of November to get a personal program. If you have not subscribed for all rounds by then, you will be randomly assigned to the remaining spots.

Lunch, dinner and drinks are all included in the price, you do not need to bring any food. Additionally, the conference does not require you to bring a bag or a laptop. Also, note that this is a serious activity so please dress appropriately.

We look forward to seeing you at CreativIT!`,
});

export default class TicketActivated extends MailTemplate<TicketActivatedParams> {
  public constructor(options: TicketActivatedParams) {
    const opt: TicketActivatedParams = {
      ...options,
    };
    if (!options.url) {
      opt.url = process.env.URL;
    }
    super(opt, ticketActivated);
  }
}
