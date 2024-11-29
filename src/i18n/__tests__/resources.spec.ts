import { resources } from "@/i18n/resources";

describe("resources", () => {
	it("Should return resources object", () => {
		// Arrange
		const translations = {
			en: {
				translation: {
					"Let's Get Started!": "Let's Get Started!",
					"With Splitify, expenses split bills is easier than ever before.":
						"With Splitify, expenses split bills is easier than ever before.",
					"Continue with Google": "Continue with Google",
					"Continue with Facebook": "Continue with Facebook",
					"Continue with Twitter": "Continue with Twitter",
					"Sign up": "Sign up",
					"Log in": "Log in",
					"Privacy Policy": "Privacy Policy",
					"Terms of Service": "Terms of Service",
					"Create account 👩‍💻": "Create account 👩‍💻",
					"Please enter your details below.":
						"Please enter your details below.",
					"First Name": "First Name",
					"First name is required": "First name is required",
					"Last Name": "Last Name",
					"Last name is required": "Last name is required",
					"I agree to Splitify {0}": "I agree to Splitify ",
					"Terms & Policy.": "Terms & Policy.",
					"You must agree to the terms & policy":
						"You must agree to the terms & policy",
					"Already have an account? {0}": "Already have an account? ",
					"Sign in": "Sign in",
					"Secure your account 🔒": "Secure your account 🔒",
					"Enter your phone number below. A SMS will be sent to that number with a OTP code.":
						"Enter your phone number below. A SMS will be sent to that number with a OTP code.",
					"Phone Number": "Phone Number",
					"Insert your phone number": "Insert your phone number",
					Continue: "Continue",
					"Enter your email below. A verification code will be sent to that email.":
						"Enter your email below. A verification code will be sent to that email.",
					Email: "Email",
					"Insert your email address": "Insert your email address",
					"OTP code verification 🔐": "OTP code verification 🔐",
					"verification.email.otpSent":
						"We have sent an OTP code to your email <0>{{email}}</0>. Enter the OTP code below to verify.",
					"verification.sms.otpSent":
						"We have sent an OTP code to your phone number <0>{{phoneNumber}}</0>. Enter the OTP code below to verify.",
					"Didn't receive the code?": "Didn't receive the code?",
					Resend: "Resend"
				}
			},
			de: {
				translation: {
					"Let's Get Started!": "Lass uns anfangen!",
					"With Splitify, expenses split bills is easier than ever before.":
						"Mit Splitify ist das Aufteilen von Ausgabenrechnungen einfacher als je zuvor.",
					"Continue with Google": "Weiter mit Google",
					"Continue with Facebook": "Weiter mit Facebook",
					"Continue with Twitter": "Weiter mit Twitter",
					"Sign up": "Melden Sie sich an",
					"Log in": "Einloggen",
					"Privacy Policy": "Datenschutzrichtlinie",
					"Terms of Service": "Servicebedingungen",
					"Create account 👩‍💻": "Konto erstellen 👩‍💻",
					"Please enter your details below.":
						"Bitte geben Sie nachstehend Ihre Daten ein.",
					"First Name": "Vorname",
					"First name is required": "Vorname ist erforderlich",
					"Last Name": "Nachname",
					"Last name is required": "Nachname ist erforderlich",
					"I agree to Splitify {0}": "Ich stimme Splitify zu ",
					"Terms & Policy.": "Bedingungen und Richtlinien.",
					"You must agree to the terms & policy":
						"Sie müssen den Bedingungen und Richtlinien zustimmen",
					"Already have an account? {0}": "Hast du schon ein Konto? ",
					"Sign in": "anmelden",
					"Secure your account 🔒": "Sichern Sie Ihr Konto 🔒",
					"Enter your phone number below. A SMS will be sent to that number with a OTP code.":
						"Geben Sie unten Ihre Telefonnummer ein. An diese Nummer wird eine SMS mit einem OTP-Code gesendet.",
					"Phone Number": "Telefonnummer",
					"Insert your phone number": "Geben Sie Ihre Telefonnummer ein",
					Continue: "Weitermachen",
					"Enter your email below. A verification code will be sent to that email.":
						"Geben Sie unten Ihre E-Mail-Adresse ein. Ein Bestätigungscode wird an diese E-Mail-Adresse gesendet.",
					Email: "E-Mail",
					"Insert your email address": "Geben Sie Ihre E-Mail-Adresse ein",
					"OTP code verification 🔐": "OTP-Code-Verifizierung 🔐",
					"verification.email.otpSent":
						"Wir haben einen OTP-Code an Ihre E-Mail-Adresse <0>{{email}}</0> gesendet. Geben Sie zur Bestätigung unten den OTP-Code ein.",
					"verification.sms.otpSent":
						"Wir haben einen OTP-Code an Ihre Telefonnummer <0>{{phoneNumber}}</0> gesendet. Geben Sie zur Bestätigung unten den OTP-Code ein.",
					"Didn't receive the code?": "Code nicht erhalten?",
					Resend: "Erneut senden"
				}
			},
			fr: {
				translation: {
					"Let's Get Started!": "Commençons!",
					"With Splitify, expenses split bills is easier than ever before.":
						"Avec Splitify, le partage des dépenses et des factures est plus facile que jamais.",
					"Continue with Google": "Continuer avec Google",
					"Continue with Facebook": "Continuer avec Facebook",
					"Continue with Twitter": "Continuer avec Twitter",
					"Sign up": "S'inscrire",
					"Log in": "Se connecter",
					"Privacy Policy": "politique de confidentialité",
					"Terms of Service": "Conditions d'utilisation",
					"Create account 👩‍💻": "Créer un compte 👩‍💻",
					"Please enter your details below.":
						"Veuillez saisir vos coordonnées ci-dessous.",
					"First Name": "Prénom",
					"First name is required": "Le prénom est obligatoire",
					"Last Name": "Nom de famille",
					"Last name is required": "Le nom de famille est obligatoire",
					"I agree to Splitify {0}": "Je suis d'accord avec Splitify ",
					"Terms & Policy.": "Conditions générales et politique.",
					"You must agree to the terms & policy":
						"Vous devez accepter les conditions et la politique",
					"Already have an account? {0}": "Vous avez déjà un compte ? ",
					"Sign in": "Se connecter",
					"Secure your account 🔒": "Sécurisez votre compte 🔒",
					"Enter your phone number below. A SMS will be sent to that number with a OTP code.":
						"Entrez votre numéro de téléphone ci-dessous. Un SMS sera envoyé à ce numéro avec un code OTP.",
					"Phone Number": "Numéro de téléphone",
					"Insert your phone number": "Insérez votre numéro de téléphone",
					Continue: "Continuer",
					"Enter your email below. A verification code will be sent to that email.":
						"Entrez votre email ci-dessous. Un code de vérification vous sera envoyé à cet email.",
					Email: "E-mail",
					"Insert your email address": "Insérez votre adresse email",
					"OTP code verification 🔐": "Vérification du code OTP 🔐",
					"verification.email.otpSent":
						"Nous avons envoyé un code OTP à votre adresse e-mail <0>{{email}}</0>. Saisissez le code OTP ci-dessous pour vérifier.",
					"verification.sms.otpSent":
						"Nous avons envoyé un code OTP à votre numéro de téléphone <0>{{phoneNumber}}</0>. Saisissez le code OTP ci-dessous pour vérifier.",
					"Didn't receive the code?": "Vous n'avez pas reçu le code ?",
					Resend: "Renvoyer"
				}
			},
			es: {
				translation: {
					"Let's Get Started!": "¡Empecemos!",
					"With Splitify, expenses split bills is easier than ever before.":
						"Con Splitify, dividir facturas de gastos es más fácil que nunca.",
					"Continue with Google": "Continuar con Google",
					"Continue with Facebook": "Continuar con Facebook",
					"Continue with Twitter": "Continuar con Twitter",
					"Sign up": "Inscribirse",
					"Log in": "Acceso",
					"Privacy Policy": "política de privacidad",
					"Terms of Service": "Condiciones de servicio",
					"Create account 👩‍💻": "Crea una cuenta 👩‍💻",
					"Please enter your details below.":
						"Por favor, introduzca sus datos a continuación.",
					"First Name": "Nombre de pila",
					"First name is required": "El nombre es obligatorio",
					"Last Name": "Apellido",
					"Last name is required": "El apellido es obligatorio",
					"I agree to Splitify {0}": "Acepto Splitify ",
					"Terms & Policy.": "Términos y políticas.",
					"You must agree to the terms & policy":
						"Debes aceptar los términos y la política",
					"Already have an account? {0}": "¿Ya tienes una cuenta? ",
					"Sign in": "Iniciar sesión",
					"Secure your account 🔒": "Protege tu cuenta 🔒",
					"Enter your phone number below. A SMS will be sent to that number with a OTP code.":
						"Ingresa tu número de teléfono a continuación. Se enviará un SMS a ese número con un código OTP.",
					"Phone Number": "Número de teléfono",
					"Insert your phone number": "Inserta tu número de teléfono",
					Continue: "Continuar",
					"Enter your email below. A verification code will be sent to that email.":
						"Ingresa tu correo electrónico a continuación. Se enviará un código de verificación a ese correo electrónico.",
					Email: "Correo electrónico",
					"Insert your email address":
						"Introduzca su dirección de correo electrónico",
					"OTP code verification 🔐": "Verificación de código OTP 🔐",
					"verification.email.otpSent":
						"Hemos enviado un código OTP a tu correo electrónico <0>{{email}}</0>. Ingresa el código OTP a continuación para verificar.",
					"verification.sms.otpSent":
						"Hemos enviado un código OTP a tu número de teléfono <0>{{phoneNumber}}</0>. Ingresa el código OTP a continuación para verificar.",
					"Didn't receive the code?": "¿No recibiste el código?",
					Resend: "Reenviar"
				}
			}
		};

		// Act

		// Assert
		console.log("resources:", resources);
		expect(resources).toStrictEqual(translations);
	});
});
