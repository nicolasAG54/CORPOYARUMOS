import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';

interface FaqEntry {
  id: string;
  question: string;
  answer: string;
  keywords: readonly string[];
  route?: string;
  linkLabel?: string;
}

interface ChatMessage {
  id: number;
  sender: 'assistant' | 'user';
  text: string;
  route?: string;
  linkLabel?: string;
}

const FAQ_ENTRIES: readonly FaqEntry[] = [
  {
    id: 'que-hace',
    question: '¿Qué hace Corpoyarumos?',
    answer:
      'Corpoyarumos articula conocimiento técnico, ejecución de proyectos y presencia territorial para fortalecer comunidades y sistemas productivos rurales en Colombia.',
    keywords: ['que hace', 'corporacion', 'quienes son', 'mision', 'servicios'],
    route: '/corporacion',
    linkLabel: 'Conocer la Corporación',
  },
  {
    id: 'proyectos',
    question: '¿Dónde puedo consultar los proyectos?',
    answer:
      'El archivo de proyectos presenta contratos, periodos, territorios y alcances documentados. También puedes abrir el expediente del proyecto El Roble.',
    keywords: ['proyecto', 'proyectos', 'contrato', 'el roble', 'impacto'],
    route: '/proyectos',
    linkLabel: 'Ver proyectos e impacto',
  },
  {
    id: 'territorios',
    question: '¿En qué territorios trabajan?',
    answer:
      'La sección Territorios reúne los municipios con evidencia estructurada y permite recorrerlos mediante un atlas y una lista equivalente.',
    keywords: ['territorio', 'territorios', 'municipio', 'municipios', 'donde trabajan', 'mapa'],
    route: '/territorios',
    linkLabel: 'Explorar territorios',
  },
  {
    id: 'publicaciones',
    question: '¿Tienen publicaciones o herramientas?',
    answer:
      'Sí. En Conocimiento encuentras publicaciones, metodologías y aprendizajes asociados a proyectos, con autoría, fecha e identificadores visibles cuando están disponibles.',
    keywords: [
      'publicacion',
      'publicaciones',
      'herramienta',
      'documento',
      'conocimiento',
      'metodologia',
    ],
    route: '/conocimiento',
    linkLabel: 'Explorar conocimiento',
  },
  {
    id: 'certificados',
    question: '¿Cómo verifico un certificado?',
    answer:
      'El servicio de verificación está en preparación y todavía no solicita datos personales. La página de estado explica las condiciones pendientes antes de habilitar la consulta.',
    keywords: ['certificado', 'certificados', 'verificar', 'verificacion'],
    route: '/verificar-certificados',
    linkLabel: 'Ver estado del servicio',
  },
  {
    id: 'fommur',
    question: '¿Cómo consulto FOMMUR Línea 3?',
    answer:
      'La consulta FOMMUR Línea 3 aún espera una fuente institucional verificable. Por seguridad, el sitio no solicita información personal mientras la integración está pendiente.',
    keywords: ['fommur', 'linea 3', 'etapa', 'consulta'],
    route: '/fommur',
    linkLabel: 'Consultar estado de FOMMUR',
  },
  {
    id: 'contacto',
    question: '¿Cómo puedo comunicarme?',
    answer:
      'Puedes preparar un mensaje desde el formulario de contacto o escribir directamente a corpoyarumos@corporacionlosyarumos.org.',
    keywords: ['contacto', 'contactar', 'correo', 'email', 'hablar', 'comunicar', 'alianza'],
    route: '/contacto',
    linkLabel: 'Ir a contacto',
  },
];

const INITIAL_MESSAGE: ChatMessage = {
  id: 0,
  sender: 'assistant',
  text: 'Hola. Puedo orientarte sobre proyectos, territorios, publicaciones y servicios institucionales. ¿Qué necesitas encontrar?',
};

@Component({
  selector: 'app-faq-chat',
  imports: [RouterLink],
  templateUrl: './faq-chat.html',
  styleUrl: './faq-chat.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqChat {
  private readonly destroyRef = inject(DestroyRef);
  private responseTimer: ReturnType<typeof setTimeout> | undefined;
  private messageSequence = 1;

  protected readonly launcher = viewChild<ElementRef<HTMLButtonElement>>('launcher');
  protected readonly chatLog = viewChild<ElementRef<HTMLDivElement>>('chatLog');
  protected readonly questionInput = viewChild<ElementRef<HTMLInputElement>>('questionInput');
  protected readonly panelOpen = signal(false);
  protected readonly isReplying = signal(false);
  protected readonly messages = signal<readonly ChatMessage[]>([INITIAL_MESSAGE]);
  protected readonly suggestions = FAQ_ENTRIES.slice(0, 4);

  constructor() {
    this.destroyRef.onDestroy(() => {
      if (this.responseTimer) {
        clearTimeout(this.responseTimer);
      }
    });
  }

  protected togglePanel(): void {
    if (this.panelOpen()) {
      this.closePanel();
      return;
    }

    this.panelOpen.set(true);
    this.focusQuestionInput();
  }

  protected closePanel(): void {
    this.panelOpen.set(false);
    setTimeout(() => this.launcher()?.nativeElement.focus());
  }

  protected handlePanelKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.closePanel();
    }
  }

  protected askSuggested(entry: FaqEntry): void {
    this.queueAnswer(entry.question, entry);
  }

  protected submitQuestion(event: SubmitEvent): void {
    event.preventDefault();
    const form = event.currentTarget;
    if (!(form instanceof HTMLFormElement) || this.isReplying()) {
      return;
    }

    const formData = new FormData(form);
    const question = String(formData.get('question') ?? '').trim();
    if (!question) {
      this.questionInput()?.nativeElement.focus();
      return;
    }

    form.reset();
    this.queueAnswer(question, this.findAnswer(question));
  }

  protected resetConversation(): void {
    if (this.responseTimer) {
      clearTimeout(this.responseTimer);
      this.responseTimer = undefined;
    }
    this.isReplying.set(false);
    this.messages.set([INITIAL_MESSAGE]);
    this.focusQuestionInput();
  }

  private queueAnswer(question: string, entry?: FaqEntry): void {
    if (this.isReplying()) {
      return;
    }

    this.messages.update((messages) => [
      ...messages,
      { id: this.messageSequence++, sender: 'user', text: question },
    ]);
    this.isReplying.set(true);
    this.scrollToLatest();

    this.responseTimer = setTimeout(() => {
      const response = entry
        ? {
            text: entry.answer,
            route: entry.route,
            linkLabel: entry.linkLabel,
          }
        : {
            text: 'No encontré una respuesta precisa para esa consulta. Puedes escribirnos desde el formulario y el equipo podrá orientarte.',
            route: '/contacto',
            linkLabel: 'Contactar al equipo',
          };

      this.messages.update((messages) => [
        ...messages,
        { id: this.messageSequence++, sender: 'assistant', ...response },
      ]);
      this.isReplying.set(false);
      this.responseTimer = undefined;
      this.scrollToLatest();
      this.focusQuestionInput();
    }, 420);
  }

  private findAnswer(question: string): FaqEntry | undefined {
    const normalizedQuestion = this.normalize(question);
    let strongestMatch: { entry: FaqEntry; score: number } | undefined;

    for (const entry of FAQ_ENTRIES) {
      const score = entry.keywords.reduce(
        (total, keyword) => total + (normalizedQuestion.includes(this.normalize(keyword)) ? 1 : 0),
        0,
      );
      if (score > 0 && (!strongestMatch || score > strongestMatch.score)) {
        strongestMatch = { entry, score };
      }
    }

    return strongestMatch?.entry;
  }

  private normalize(value: string): string {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLocaleLowerCase('es-CO');
  }

  private scrollToLatest(): void {
    queueMicrotask(() => {
      const log = this.chatLog()?.nativeElement;
      if (log) {
        log.scrollTop = log.scrollHeight;
      }
    });
  }

  private focusQuestionInput(): void {
    setTimeout(() => this.questionInput()?.nativeElement.focus());
  }
}
