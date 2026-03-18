export interface Credentials {
  username: string;
  password: string;
}

export interface CheckoutInformation {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export interface ProductData {
  name: string;
}

export interface ErrorMessages {
  lockedOut: string;
  usernameRequired: string;
  passwordRequired: string;
  firstNameRequired: string;
  postalCodeRequired: string;
}

export const testData = {
  users: {
    standard: {
      username: 'standard_user',
      password: 'secret_sauce',
    } as Credentials,
    lockedOut: {
      username: 'locked_out_user',
      password: 'secret_sauce',
    } as Credentials,
  },
  products: {
    all: [
      { name: 'Sauce Labs Backpack' },
      { name: 'Sauce Labs Bike Light' },
      { name: 'Sauce Labs Bolt T-Shirt' },
      { name: 'Sauce Labs Fleece Jacket' },
      { name: 'Sauce Labs Onesie' },
      { name: 'Test.allTheThings() T-Shirt (Red)' },
    ] as ProductData[],
    detailTarget: {
      name: 'Sauce Labs Backpack',
    } as ProductData,
    checkoutTargets: [
      { name: 'Sauce Labs Backpack' },
      { name: 'Sauce Labs Bike Light' },
    ] as ProductData[],
    persistenceTarget: {
      name: 'Sauce Labs Onesie',
    } as ProductData,
    negativeFlowTarget: {
      name: 'Sauce Labs Bolt T-Shirt',
    } as ProductData,
  },
  checkoutInformation: {
    firstName: 'Ana',
    lastName: 'Senior',
    postalCode: '110111',
  } as CheckoutInformation,
  messages: {
    lockedOut: 'Epic sadface: Sorry, this user has been locked out.',
    usernameRequired: 'Epic sadface: Username is required',
    passwordRequired: 'Epic sadface: Password is required',
    firstNameRequired: 'Error: First Name is required',
    postalCodeRequired: 'Error: Postal Code is required',
  } as ErrorMessages,
  routes: {
    inventory: /.*inventory\.html/,
    productDetails: /.*inventory-item\.html/,
    checkoutStepOne: /.*checkout-step-one\.html/,
    checkoutStepTwo: /.*checkout-step-two\.html/,
    checkoutComplete: /.*checkout-complete\.html/,
  },
} as const;
