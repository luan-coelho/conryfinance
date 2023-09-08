export default class ProblemDetails {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;

  constructor({
    type,
    title,
    status,
    detail,
    instance,
  }: {
    type: string;
    title: string;
    status: number;
    detail: string;
    instance: string;
  }) {
    this.type = type;
    this.title = title;
    this.status = status;
    this.detail = detail;
    this.instance = instance;
  }

  static badRequest({ detail, instance }: { detail: string; instance: string }): ProblemDetails {
    return new ProblemDetails({
      type: "https://example.com/probs/bad-request",
      title: "Validação falhou",
      status: 400,
      detail,
      instance,
    });
  }

  static internalServerError({ detail, instance }: { detail: string; instance: string }): ProblemDetails {
    return new ProblemDetails({
      type: "https://example.com/probs/internal-server-error",
      title: "Erro interno do servidor",
      status: 500,
      detail,
      instance,
    });
  }
}
