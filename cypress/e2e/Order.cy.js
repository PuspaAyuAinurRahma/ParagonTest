const { it } = require("mocha");

describe('Product Catalog Page', () => {
    beforeEach(() => {
      cy.visit('https://recruitment-staging-queenbee.paradev.io/');
      if (cy.contains('Ketahui aroma kepribadianmu dan skincare yang cocok untuk kulitmu').should('exist')) {
        cy.get('.chakra-modal__content-container').click(20, 20);
      }
    });

    it('Verify Add and Remove Product', () => {
        //Login
        cy.get('.HeaderQbee_text-masuk__mWQAN > a')
            .click();
        cy.get('#page-login__tabs-email')
            .click();
        cy.get('#page-login__tabs-email__input-email')
            .type('automationtest@mailinator.com');
        cy.get('#page-login__tabs-email__input-password')
            .type('Automation123!');
        cy.get('#page-login__button-login')
            .click();

        //Verify product card
        cy.wait(5000);
        cy.visit('https://recruitment-staging-queenbee.paradev.io/');
        cy.get(':nth-child(1) > .styles_card-img-container__VHrs_ > .css-4g6ai3 > [style="box-sizing: border-box; display: inline-block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: relative; max-width: 100%;"] > .styles_card-img-grid__M7F1w')
            .should('exist');
        cy.get(':nth-child(1) > .styles_card-info-wrapper__9HT1O > .styles_card-info__uYTN4 > .css-4g6ai3 > .styles_card-body-h2-grid__lzKGQ')
            .should('exist');
        cy.get(':nth-child(1) > .styles_card-info-wrapper__9HT1O > .styles_card-info__uYTN4 > .styles_card-body-p-grid__doX4O')
            .should('exist');
        cy.get(':nth-child(1) > .styles_card-info-wrapper__9HT1O > .styles_card-info__uYTN4 > .styles_discount-grid__yO3bl')
            .should('exist');
        cy.get(':nth-child(1) > .styles_card-info-wrapper__9HT1O > .styles_card-info__uYTN4 > .styles_rating-grid__OQPY7')
            .should('exist');

        //Add product to cart
        cy.wait(5000);
        if (cy.get(':nth-child(1) > .styles_card-info-wrapper__9HT1O > :nth-child(2) > #add-to-cart-recomendation').should('exist')) {
            cy.get(':nth-child(1) > .styles_card-info-wrapper__9HT1O > :nth-child(2) > #add-to-cart-recomendation')
                .click();
            cy.get('.ButtonKeranjangQbee_counter-label-content__K234Y')
                .should('exist')
                .contains('1');
            cy.get('.HeaderQbee_total-cart-num__JcmEp')
                .should('exist')
                .contains('1');
        }

        //Remove product from cart
        cy.get('.HeaderQbee_total-cart__Acy0A')
            .click();
        cy.get('.style_delete-allcart__2IuAX > .chakra-button')
            .click();
        cy.get('.styles_popup-delete__button__i5ksa')
            .click();
        cy.reload()
    });

    it('Verify Click Beli Sekarang button - No Intial Purchase', () => {
        //Login
        cy.get('.HeaderQbee_text-masuk__mWQAN > a')
            .click();
        cy.get('#page-login__tabs-email')
            .click();
        cy.get('#page-login__tabs-email__input-email')
            .type('automationtest@mailinator.com');
        cy.get('#page-login__tabs-email__input-password')
            .type('Automation123!');
        cy.get('#page-login__button-login')
            .click();
        cy.wait(5000);
        cy.visit('https://recruitment-staging-queenbee.paradev.io/shop');

        // Verify Beli Sekarang when user has no initial purchase
        cy.get('.slick-active > :nth-child(1) > .css-prstg > .recommendationCard_card-container__QTj37 > .recommendationCard_card-footer-container__GwTce > :nth-child(2) > .css-70qvj9 > .chakra-button')
            .click();
        cy.get('#chakra-modal--header-13 > .chakra-text')
            .contains('Belum menjadi Member');
        cy.get('#chakra-modal--body-13 > .chakra-text')
            .contains('Belanja minimal Rp1.5 juta untuk menjadi member aktif dan raih keuntungannya.');
        cy.get('.chakra-modal__footer > .chakra-button')
            .contains('Lanjut Belanja');
        cy.get('.chakra-modal__footer > .chakra-button')
            .click();

        //Verify Overview Page when user has no initial purchase
        cy.visit('https://recruitment-staging-queenbee.paradev.io/profile/overview');
        cy.get('.style_locked__membership-subtitle___KlVu')
            .contains('Belum ada level');
        cy.get('.style_container-2__VFuNv')
            .should('exist');
        cy.get('.style_locked__fitur-title__nLiHG')
            .contains('Belum menjadi member');
        cy.get('.style_locked__fitur-subtitle__YfGpC')
            .contains('Belanja minimal Rp1.5 juta untuk menjadi member aktif Beyondly dan buka banyak fitur.');
        cy.get('.css-s2uf1z > .chakra-button')
            .contains('Lanjut Belanja')
            .click();
        cy.url()
            .should('eq', 'https://recruitment-staging-queenbee.paradev.io/shop')
    });

    it('Verify Order Product', () => {
        //Login
        cy.get('.HeaderQbee_text-masuk__mWQAN > a')
            .click();
        cy.get('#page-login__tabs-email')
            .click();
        cy.get('#page-login__tabs-email__input-email')
            .type('automationtest@mailinator.com');
        cy.get('#page-login__tabs-email__input-password')
            .type('Automation123!');
        cy.get('#page-login__button-login')
            .click();
        cy.wait(5000);
        cy.visit('https://recruitment-staging-queenbee.paradev.io/shop');

        cy.get(':nth-child(1) > .styles_card-info-wrapper__9HT1O > :nth-child(2) > #add-to-cart-recomendation > .ButtonKeranjangQbee_add-to-cart-text__wDLxl')
            .click();
        cy.wait(5000);
        cy.get('.HeaderQbee_total-cart__Acy0A')
            .click();
        cy.get('.chakra-editable')
            .type('10');
        cy.get('.style_locked-fitur__progress-text__75WrM')
            .contains('Total belanja cukup untuk mengaktifkan Member dan mendapatkan hadiah!');
        cy.get('.style_total-price__VXjDD')
            .contains('Total harga: Rp3.240.000');
        cy.get('.css-1lkbl0a')
            .contains('Tambah produk lain')
            .should('not.be.disabled');
        cy.get('.css-1pilj7v')
            .contains('Beli sekarang')
            .should('not.be.disabled');
        cy.get('.css-1hyoz7m > .chakra-button')
            .click();
        cy.get('.css-1pilj7v')
            .click();

        //Verify Cek Pesanan Page
        cy.get('.pickDelivery_pickDelivery-upper__gRRQ_')
            .click();
        cy.get(':nth-child(2) > .pickDelivery_regular-delivery-content__9aYv_ > .pickDelivery_title-content__K_E9L > .pickDelivery_input-margin__Bg4Tr')
            .click();
        cy.get(':nth-child(1) > .pickCourier_courier-label__6H8Aj > .pickCourier_title-content__dZgUS > input')
            .click();
        cy.get('.checkoutSummary_checkout-summary-total__gYwkB')
            .contains('Rp 3.332.000');
        cy.get('.checkoutSummary_checkout-total__A_3jU > .chakra-button')
            .click();

        //Verify Pilih Pembayaran Page
        cy.wait(5000);
        cy.get('#accordion-button-8')
            .click();
        cy.get(':nth-child(4) > .row > .col-2 > .radio-button-payment > .chakra-radio > .chakra-radio__control')
            .click();
        cy.get('.chakra-button')
            .click();

        //Verify Bayar Pesanan Page
        cy.get('.styles_header-title__6i6KY')
            .contains('Bayar Pesanan');
        cy.get('.style_batas-waktu__ZCaw1')
            .contains('Batas waktu pembayaran');
        cy.get('.style_howToPay-title__A_lcC')
            .contains('Cara pembayaran');
        cy.get('[style="font-size: 18px; line-height: 24px; font-weight: 600; color: rgb(26, 26, 26); margin-bottom: 0.75em; margin-top: 1em; font-family: Inter;"]')
            .contains('Metode pembayaran');
        cy.get('.style_bank-virtual-account__uv9O9')
            .contains('BCA Virtual Account');
        cy.get('.style_button-cancel-order__7xEXf')
            .click();
        cy.get('.style_button-wrapper__d__Aj > :nth-child(1) > .chakra-button')
            .click();
        
    });
});