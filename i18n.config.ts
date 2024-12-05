// https://stackoverflow.com/questions/48861001/multiple-translations-files-per-language-with-vue-i18n-and-nuxtjs
// https://phrase.com/blog/posts/nuxt-js-tutorial-i18n/
// https://elifnurturk.medium.com/i18n-localization-for-nuxt-3-implement-multi-language-support-for-website-323ecceaf4e6

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      federation: 'Guides and Scouts of Europe',
      welcome: 'Welcome',
      label: {
        email: 'Email',
        password: 'Password',
        password_confirm: 'Confirm Password',
        login: 'Login',
        reset: 'Reset',
        register: 'Register',
        confirm: 'Confirm',
        resend: 'Resend',
        firstname: 'Firstname',
        lastname: 'Lastname',
        street: 'Street & Nr',
        zip: 'Zip Code',
        community: 'Community',
        country: 'Country',
        date_of_birth: 'Date of birth',
        gender: 'Gender',
      },
      title: {
        welcome: 'Welcome',
        register: 'Register',
        logout: 'Logout',
      },
      enum: {
        gender: {
          MALE: 'Male',
          FEMALE: 'Female',
        },
      },
      auth: {
        forgot: 'Forgot your password?',
        forgot_help: 'Please enter the email address associated with your account and we will email you a link to reset your password.',
        registered_not: 'Not yet registered?',
        registered_already: 'Already registered?',
        tologin: 'Try to login?',
        create: 'Create an account',
        reset: 'Reset',
        verify: 'Verification',
        verification: "Enter the 6-digit number which has been send to your email adress.",
        logged_out: "You're logged out!",
      },
    },
    nl: {
      federation: 'Europascouts en -gidsen',
      welcome: 'Welkom',
      label: {
        email: 'Email',
        password: 'Wachtwoord',
        password_confirm: 'Wachtwoord bevestigen',
        login: 'Inloggen',
        reset: 'Reset',
        register: 'Registreer',
        confirm: 'Bevestig',
        resend: 'Opnieuw verzenden',
        firstname: 'Voornaam',
        lastname: 'Familienaam',
        street: 'Straat & Nr',
        zip: 'Postcode',
        community: 'Gemeente',
        country: 'Land',
        date_of_birth: 'Geboortedatum',
        gender: 'Geslacht',
      },
      title: {
        welcome: 'Welkom',
        register: 'Registreer',
        logout: 'Afmelden',

      },
      enum: {
        gender: {
          MALE: 'Man',
          FEMALE: 'Vrouw',
        },
      },
      auth: {
        forgot: 'Wachtwoord vergeten?',
        forgot_help: 'Voer uw email adres in en wij sturen u een link om je wachtwoord te herstellen.',
        registered_not: 'Nog niet geregistreerd?',
        registered_already: 'Al geregistreerd?',
        tologin: 'Probeer je in te loggen?',
        create: 'Account aanmaken',
        verify: 'Verificatie',
        verification: "Vul de code in die zonet verzonder werd naar uw emailadres.",
        logged_out: "Je bent afgemeld!",
      },
    },
    fr: {
      federation: "Guides et Scouts d'Europe",
      welcome: 'Bienvenue',
      label: {
        email: 'E-mail',
        password: 'Mot de passe',
        password_confirm: 'Confirmation du mot de passe',
        login: 'Se connecter',
        reset: 'Réinitialiser',
        register: 'Enregister',
        confirm: 'Confirmer',
        resend: 'Renvoyer',


        firstname: 'Prénom',
        lastname: 'Nom de famille',
        street: 'Rue & No\.',
        zip: 'Code postal',
        community: 'Commune',
        country: 'Pays',
        date_of_birth: 'Date de naissance',
        gender: 'Sexe',
        continue: 'Continue',

      },
      title: {
        welcome: 'Bienvenue',
        register: 'Enregister',
        logout: 'Déconnexion',
      },
      enum: {
        gender: {
          MALE: 'Homme',
          FEMALE: 'Femme',
        },
      },
      auth: {
        forgot: 'Mot de passe oublié?',
        forgot_help: "Veuillez saisir l'adresse e-mail associée à votre compte et nous vous enverrons par e-mail un lien pour réinitialiser votre mot de passe.",
        registered_not: 'Pas encore inscrit?',
        registered_already: 'Déjà inscrit?',
        tologin: 'Essayer de se connecter?',
        create: 'Créer un compte',
        verify: 'Verification',
        verification: "Entrez le numéro à 6 chiffres qui a été envoyé à votre adresse e-mail.",
        logged_out: "Vous êtes déconnecté!",
      },
    }
  }
}))