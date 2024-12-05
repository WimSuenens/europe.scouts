import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export class Mailer {
  private _config?: SMTPTransport | SMTPTransport.Options | string;
  private _defaults?: SMTPTransport.Options;

  constructor(
    config: SMTPTransport | SMTPTransport.Options | string,
    defaults?: SMTPTransport.Options
  ) {
    console.log('Mailer - constructor')
    this._config = config
    this._defaults = defaults
}

  // private static _instance: Mailer;
  // public static get Instance(): Mailer {
  //   if (!this._instance) {
  //     this._instance = new Mailer();
  //   }
  //   return this._instance;
  // }

  // use(config: SMTPTransport | SMTPTransport.Options | string, defaults?: SMTPTransport.Options) {
  //   this._config = config
  //   this._defaults = defaults
  // }

  async send(mail: Mail.Options, defaults?: SMTPTransport.Options) {
    return await createTransport(this._config, this._defaults)
      .sendMail(mail)
  }
}

// declare const globalThis: {
//   mailerGlobal: Mailer;
// } & typeof global;

// const mailer = globalThis.mailerGlobal ?? Mailer.Instance
declare module 'h3' {
  interface H3EventContext {
    $mailer: Mailer
  }
}

export default defineNitroPlugin((nuxtApp) => {
  const { mail: { host, port, secure, user, password: pass} } = useRuntimeConfig()
  // mailer.use({ host, port, secure, auth: { user, pass } })

  const mailer = new Mailer({ host, port, secure, auth: { user, pass } })

  nuxtApp.hooks.hook('request', (event) => {
    event.context.$mailer = mailer
  })

})