import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact-page',
  imports: [RouterLink],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPage {
  protected readonly mailPrepared = signal(false);

  protected submitContact(event: SubmitEvent): void {
    event.preventDefault();

    const form = event.currentTarget;
    if (!(form instanceof HTMLFormElement) || !form.reportValidity()) {
      return;
    }

    const formData = new FormData(form);
    const readValue = (field: string): string => String(formData.get(field) ?? '').trim();

    if (readValue('website')) {
      return;
    }

    const name = readValue('name');
    const subject = `[Contacto web] ${readValue('topic')} — ${name}`;
    const body = [
      `Nombre: ${name}`,
      `Correo: ${readValue('email')}`,
      `Organización: ${readValue('organization') || 'No indicada'}`,
      `Tema: ${readValue('topic')}`,
      '',
      'Mensaje:',
      readValue('message'),
    ].join('\n');

    this.mailPrepared.set(true);
    window.location.href = `mailto:corpoyarumos@corporacionlosyarumos.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
}
