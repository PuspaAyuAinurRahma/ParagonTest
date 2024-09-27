import 'cypress-wait-until';
const uuid = () => Cypress._.random(0, 1e6)
const id = uuid()
const randomString = `randomString${id}`
const generateRandomPhoneNumber = () => {
  // Ensure the first digit is not zero
  const firstDigit = Math.floor(Math.random() * 9) + 1;
  // Generate the remaining 10 digits
  const remainingDigits = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('');
  return `${firstDigit}${remainingDigits}`;
};
const randomPhoneNumber = generateRandomPhoneNumber();

describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('https://recruitment-staging-queenbee.paradev.io/');
    if (cy.contains('Ketahui aroma kepribadianmu dan skincare yang cocok untuk kulitmu').should('exist')) {
      cy.get('.chakra-modal__content-container').click(20, 20);
    }
  });

  it('[Registration] - Referal Code Page', () => {
    cy.get('#daftar-reseller-navbar').click();
    //Verify Referal Page Component
    cy.get('.css-4hc13')
      .contains('Apakah Anda memiliki Kode Referral dari Sponsor?');
    cy.get(':nth-child(1) > .chakra-radio__label > .chakra-text')
      .contains('Ya, saya memiliki kode Referral.');
    cy.get(':nth-child(2) > .chakra-radio__label > .chakra-text')
      .contains('Tidak, saya tidak memiliki kode Referral.'); 
    cy.get('.css-79elbk > .css-0')
    .should('exist');
    cy.get('.styles_footer-register__uehJs')
    .should('exist');
    //Verify Cookies
    if (cy.get('.css-7x9938').should('exist')) {
      cy.get('.css-1hyoz7m > .chakra-text')
        .contains('Dengan mengklik “Izinkan semua cookies”, Anda setuju dengan menyimpan cookies di perangkat Anda untuk meningkatkan pengalaman berbelanja di dalam website, analisis penggunaan website, dan membantu upaya pemasaran kami.');
      cy.get('.css-1hyoz7m > .chakra-button')
        .contains('Izinkan semua cookies').click();
    }
    //Verify Login Button
    cy.get('b').click();
    cy.url()
    .should('be.equal', 'https://recruitment-staging-queenbee.paradev.io/login')
  });

  it('[Registration] - Register with referal code', () => {
    cy.get('#daftar-reseller-navbar')
      .click();
    cy.wait(3000);
    cy.scrollTo('bottom');

    //Verify referal code field exist when user click yes radio button
    cy.get(':nth-child(1) > .chakra-radio__control')
      .click();
    cy.get('.styles_field-title__M7PdV')
      .should('have.text', 'Kode Referral');
    cy.get('.chakra-input')
      .should('have.attr', 'placeholder', 'Masukkan kode referral');

    //Verify referal code field does not exist when user click no radio button
    cy.get(':nth-child(3) > .chakra-radio__control')
      .click();
    cy.get('.styles_field-title__M7PdV')
      .should('not.exist');
    cy.get('.chakra-input')
      .should('not.exist');

    //Input invalid referal code
    cy.get(':nth-child(1) > .chakra-radio__control')
      .click();
    cy.wait(3000);
    cy.get('.chakra-input')
      .type('123');
    cy.get('.css-79elbk > .chakra-button')
      .click();
    cy.get('.css-i7bokw > p')
      .should('exist')
      .contains('Kode referral tidak terdaftar');
    cy.get('.chakra-input').clear();

    //Input valid referal code
    cy.get('.chakra-input')
      .type('RFACTIV764');
    cy.get('.css-79elbk > .chakra-button')
      .click();
    cy.wait(3000);

    //Verify Buat Akun Page
    cy.get('.css-1hyoz7m > .chakra-button').click();
    cy.get('[style="margin-top: 2rem; margin-right: 1rem; margin-bottom: 0px;"] > .styles_field-title__0C9dO')
      .should('exist')
      .contains('Nama Lengkap');
    cy.get('[style="margin-top: 2rem; margin-right: 1rem; margin-bottom: 0px;"] > .styles_field-title__0C9dO')
      .should('exist');
    cy.get('[style="margin-top: 2rem; margin-right: 1rem; margin-bottom: 0px;"] > .chakra-input__group > .chakra-input')
      .should('have.attr', 'placeholder', 'Isi dengan nama lengkap Anda');
    cy.get('[style="margin-right: 1rem; margin-bottom: 0px;"] > .styles_field-title__0C9dO')
      .should('exist')
      .contains('No. HP');
    cy.get('[style="margin-right: 1rem; margin-bottom: 0px;"] > .styles_field-title__0C9dO')
      .should('exist');
    cy.get('.chakra-input__left-addon')
      .should('exist')
      .contains('+62');
    cy.get('[style="margin-right: 1rem; margin-bottom: 0px;"] > .chakra-input__group > .chakra-input')
      .should('have.attr', 'placeholder', 'Contoh: 81234567890');
      cy.get('.styles_flex-container__YCmn7 > :nth-child(2) > .styles_field-title__0C9dO')
      .should('exist')
      .contains('Email (opsional)');
    cy.get('.styles_flex-container__YCmn7 > :nth-child(2) > .chakra-input__group > .chakra-input')
      .should('have.attr', 'placeholder', 'Isi dengan email Anda');
    cy.get('[style="margin: 16px 0px;"] > .styles_field-title__0C9dO')
      .should('exist')
      .contains('Password');
    cy.get('[style="margin: 16px 0px;"] > .styles_field-title__0C9dO')
      .should('exist');
    cy.get('[style="margin: 16px 0px;"] > .chakra-input__group > .chakra-input')
      .should('have.attr', 'placeholder', 'Tulis password Anda di sini');
    cy.get('.chakra-input__right-element')
      .should('exist');

    //Input value for buat akun page
    cy.get(':nth-child(3) > .chakra-button')
    .should('be.disabled');
    cy.get('[style="margin-top: 2rem; margin-right: 1rem; margin-bottom: 0px;"] > .chakra-input__group > .chakra-input')
      .type(randomString);
    cy.get('[style="margin-right: 1rem; margin-bottom: 0px;"] > .chakra-input__group > .chakra-input')
      .type(randomPhoneNumber);
    cy.get('[style="margin: 16px 0px;"] > .chakra-input__group > .chakra-input')
      .type('Password123!');
    cy.get(':nth-child(3) > .chakra-button')
      .should('be.enabled');

    //Verify phone number validation
    cy.get('[style="margin-right: 1rem; margin-bottom: 0px;"] > .chakra-input__group > .chakra-input')
      .clear();
    cy.get('[style="margin-right: 1rem; margin-bottom: 0px;"] > .chakra-input__group > .chakra-input')
      .type('12345');
    cy.get(':nth-child(3) > .chakra-button')
      .click();
    cy.get('[style="margin-right: 1rem; margin-bottom: 0px;"] > p')
      .should('exist')
      .contains('Nomor handphone harus terdiri dari minimal 8 digit. Silakan masukkan nomor handphone yang valid.');

    //Verify email validation
    cy.get('.styles_flex-container__YCmn7 > :nth-child(2) > .chakra-input__group > .chakra-input')
    .type(randomString);
    cy.get(':nth-child(3) > .chakra-button')
      .click();
    cy.get('[style="margin-right: 1rem; margin-bottom: 0px;"] > p')
      .should('exist')
      .contains('Nomor handphone harus terdiri dari minimal 8 digit. Silakan masukkan nomor handphone yang valid.');
    cy.get('.styles_flex-container__YCmn7 > :nth-child(2) > p')
      .should('exist')
      .contains('Email yang Anda masukkan tidak valid. Silakan masukkan email yang valid.');

    //Verify password validation
    cy.get('[style="margin: 16px 0px;"] > .chakra-input__group > .chakra-input')
      .clear()
      .type('123');
    cy.get(':nth-child(3) > .chakra-button')
      .should('be.disabled');

    //Input valid value for all field
    cy.get('[style="margin-right: 1rem; margin-bottom: 0px;"] > .chakra-input__group > .chakra-input')
      .clear();
    cy.get('[style="margin-right: 1rem; margin-bottom: 0px;"] > .chakra-input__group > .chakra-input')  
      .type(randomPhoneNumber);
    cy.get('.styles_flex-container__YCmn7 > :nth-child(2) > .chakra-input__group > .chakra-input')
      .clear()
      .type(randomString+'@gmail.com');
    cy.get('[style="margin: 16px 0px;"] > .chakra-input__group > .chakra-input')
      .clear()
      .type('Password123!');
    cy.get(':nth-child(3) > .chakra-button')
      .should('be.enabled')
      .click();

    //OTP Modal and verify success register
    cy.get('#chakra-modal--header-2')
      .should('exist')
      .contains('Pilih Metode Verifikasi');
    cy.get('#chakra-modal--body-2 > .chakra-button')
      .should('exist')
      .click();
    cy.get('#pin-input-10-0')
      .type('123456');
    cy.get('.css-15icixv > .chakra-button')
      .click();
    cy.get('.styles_verifSuccess-circle-gif__laONP')
      .should('exist');
    cy.get('.styles_verifSuccess-title__S7W6_')
      .contains('Verifikasi sukses');
  });

  it('[Registration] - Register with no referal code', () => {
    cy.get('#daftar-reseller-navbar')
      .click();
    cy.wait(3000);

    //Verify referal code field exist when user click yes radio button
    cy.get(':nth-child(1) > .chakra-radio__control')
      .click();
    cy.get('.styles_field-title__M7PdV')
      .should('have.text', 'Kode Referral');
    cy.get('.chakra-input')
      .should('have.attr', 'placeholder', 'Masukkan kode referral');

    //Verify referal code field does not exist when user click no radio button
    cy.get(':nth-child(3) > .chakra-radio__control')
      .click();
    cy.get('.styles_field-title__M7PdV')
      .should('not.exist');
    cy.get('.chakra-input')
      .should('not.exist');
    cy.get('.css-79elbk > .chakra-button')
      .click();

    //Verify Buat Akun Page
    cy.get('.css-1hyoz7m > .chakra-button').click();
    cy.get('[style="margin-top: 2rem; margin-right: 1rem; margin-bottom: 0px;"] > .styles_field-title__0C9dO')
      .should('exist')
      .contains('Nama Lengkap');
    cy.get('[style="margin-top: 2rem; margin-right: 1rem; margin-bottom: 0px;"] > .styles_field-title__0C9dO')
      .should('exist');
    cy.get('[style="margin-top: 2rem; margin-right: 1rem; margin-bottom: 0px;"] > .chakra-input__group > .chakra-input')
      .should('have.attr', 'placeholder', 'Isi dengan nama lengkap Anda');
    cy.get('[style="margin-right: 1rem; margin-bottom: 0px;"] > .styles_field-title__0C9dO')
      .should('exist')
      .contains('No. HP');
    cy.get('[style="margin-right: 1rem; margin-bottom: 0px;"] > .styles_field-title__0C9dO')
      .should('exist');
    cy.get('.chakra-input__left-addon')
      .should('exist')
      .contains('+62');
    cy.get('[style="margin-right: 1rem; margin-bottom: 0px;"] > .chakra-input__group > .chakra-input')
      .should('have.attr', 'placeholder', 'Contoh: 81234567890');
      cy.get('.styles_flex-container__YCmn7 > :nth-child(2) > .styles_field-title__0C9dO')
      .should('exist')
      .contains('Email (opsional)');
    cy.get('.styles_flex-container__YCmn7 > :nth-child(2) > .chakra-input__group > .chakra-input')
      .should('have.attr', 'placeholder', 'Isi dengan email Anda');
    cy.get('[style="margin: 16px 0px;"] > .styles_field-title__0C9dO')
      .should('exist')
      .contains('Password');
    cy.get('[style="margin: 16px 0px;"] > .styles_field-title__0C9dO')
      .should('exist');
    cy.get('[style="margin: 16px 0px;"] > .chakra-input__group > .chakra-input')
      .should('have.attr', 'placeholder', 'Tulis password Anda di sini');
    cy.get('.chakra-input__right-element')
      .should('exist');

    //Input value for buat akun page
    cy.get(':nth-child(3) > .chakra-button')
    .should('be.disabled');
    cy.get('[style="margin-top: 2rem; margin-right: 1rem; margin-bottom: 0px;"] > .chakra-input__group > .chakra-input')
      .type(randomString+'2');
    cy.get('[style="margin-right: 1rem; margin-bottom: 0px;"] > .chakra-input__group > .chakra-input')
      .type(randomPhoneNumber+'1');
    cy.get('[style="margin: 16px 0px;"] > .chakra-input__group > .chakra-input')
      .type('Password123!');
    cy.get(':nth-child(3) > .chakra-button')
      .should('be.enabled');

    //Verify phone number validation
    cy.get('[style="margin-right: 1rem; margin-bottom: 0px;"] > .chakra-input__group > .chakra-input')
      .clear();
    cy.get('[style="margin-right: 1rem; margin-bottom: 0px;"] > .chakra-input__group > .chakra-input')
      .type('12345');
    cy.get(':nth-child(3) > .chakra-button')
      .click();
    cy.get('[style="margin-right: 1rem; margin-bottom: 0px;"] > p')
      .should('exist')
      .contains('Nomor handphone harus terdiri dari minimal 8 digit. Silakan masukkan nomor handphone yang valid.');

    //Verify email validation
    cy.get('.styles_flex-container__YCmn7 > :nth-child(2) > .chakra-input__group > .chakra-input')
    .type(randomString);
    cy.get(':nth-child(3) > .chakra-button')
      .click();
    cy.get('[style="margin-right: 1rem; margin-bottom: 0px;"] > p')
      .should('exist')
      .contains('Nomor handphone harus terdiri dari minimal 8 digit. Silakan masukkan nomor handphone yang valid.');
    cy.get('.styles_flex-container__YCmn7 > :nth-child(2) > p')
      .should('exist')
      .contains('Email yang Anda masukkan tidak valid. Silakan masukkan email yang valid.');

    //Verify password validation
    cy.get('[style="margin: 16px 0px;"] > .chakra-input__group > .chakra-input')
      .clear()
      .type('123');
    cy.get(':nth-child(3) > .chakra-button')
      .should('be.disabled');

    //Input valid value for all field
    cy.get('[style="margin-right: 1rem; margin-bottom: 0px;"] > .chakra-input__group > .chakra-input')
      .clear();
    cy.get('[style="margin-right: 1rem; margin-bottom: 0px;"] > .chakra-input__group > .chakra-input')
      .type(randomPhoneNumber+'1');
    cy.get('.styles_flex-container__YCmn7 > :nth-child(2) > .chakra-input__group > .chakra-input')
      .clear()
      .type(randomString+'2@gmail.com');
    cy.get('[style="margin: 16px 0px;"] > .chakra-input__group > .chakra-input')
      .clear()
      .type('Password123!');
    cy.get(':nth-child(3) > .chakra-button')
      .should('be.enabled')
      .click();

    //OTP Modal and verify success register
    cy.wait(5000);
    cy.get('#chakra-modal--header-2')
      .should('exist')
      .contains('Pilih Metode Verifikasi');
    cy.get('#chakra-modal--body-2 > .chakra-button')
      .should('exist')
      .click();
    cy.get('#pin-input-10-0')
      .type('123456');
      cy.get('.css-15icixv > .chakra-button')
      .click();
    cy.get('.styles_verifSuccess-circle-gif__laONP')
      .should('exist');
    cy.get('.styles_verifSuccess-title__S7W6_')
      .contains('Verifikasi sukses');
  });

  it('[Login] - Verify Login Page', () => {
    cy.get('.HeaderQbee_text-masuk__mWQAN > a').click();
    cy.get('.styles_title__JWtmT')
      .contains('Masuk');
    cy.get('#page-login__tabs-number')
      .contains('Nomor HP');
    cy.get('#page-login__tabs-email')
      .contains('Email')
      .click();
    cy.get('[style="margin-bottom: 32px;"] > .styles_field-title__vDIkU')
      .contains('Email');
    cy.get('#page-login__tabs-email__input-email')
      .should('exist');
    cy.get('[style="margin-bottom: 16px;"] > .styles_field-title__vDIkU')
      .contains('Password');
    cy.get('#page-login__tabs-email__input-password')
      .should('exist');
    cy.get('#page-login__tabs-email__input-password__view')
      .should('exist');
    cy.get('#page-login__forgot-password')
      .contains('Lupa password? Pulihkan');
    cy.get('#page-login__button-login')
      .contains('Masuk');
    cy.get('#page-login__register')
      .contains('Daftar');

    //Verify url in forgot password
    cy.get('#page-login__forgot-password')
      .click()
    cy.url().should('eq', 'https://recruitment-staging-queenbee.paradev.io/forgot-password');
    cy.get('.styles_title__7xGFu')
      .contains('Lupa Password');
    cy.go('back');

    //Verify url in Daftar
    cy.get('#page-login__register > span')
      .click();
    cy.url().should('eq', 'https://recruitment-staging-queenbee.paradev.io/register');
    cy.go('back');
  });

  it('[Login-Email] - Login with invalid email and password', () => {
    cy.get('.HeaderQbee_text-masuk__mWQAN > a').click();
    cy.get('.styles_title__JWtmT').contains('Masuk');
    cy.get('#page-login__tabs-email').click();
    cy.get('#page-login__tabs-email__input-email')
      .type('automation');
    cy.get('#page-login__tabs-email__input-password')
      .type('Password123!');
    cy.get('#page-login__button-login').click();
    cy.get('[style="color: red; margin-bottom: 16px;"]')
      .contains('Email atau password salah. Coba ulangi.');
  });

  it('[Login-Email] - Login with valid email and password', () => {
    cy.get('.HeaderQbee_text-masuk__mWQAN > a').click();
    cy.get('.styles_title__JWtmT').contains('Masuk');
    cy.get('#page-login__tabs-email').click();
    cy.get('#page-login__tabs-email__input-email')
      .type('automationtest@mailinator.com');
    cy.get('#page-login__tabs-email__input-password')
      .type('Automation123!');
    cy.get('#page-login__button-login').click();
    cy.wait(5000);
    cy.get('.css-4g6ai3 > .img-fluid').should('exist');
  });
});
