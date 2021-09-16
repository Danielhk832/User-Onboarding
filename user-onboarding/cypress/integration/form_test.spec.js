describe("user onboarding", () => {
  beforeEach(() => {
    cy.visit("localhost:3000");
  });

  const firstName = () => cy.get("input[name=first_name]");
  const lastName = () => cy.get("input[name=last_name]");
  const emailInput = () => cy.get("input[name=email]");
  const passwordInput = () => cy.get("input[name=password]");
  const checkboxInput = () => cy.get("input[name=tos]");
  const submitButton = () => cy.get("button[id=submitButton");

  it("sanity check to make sure tests work", () => {
    expect(1 + 2).to.equal(3);
    expect(2 + 2).not.to.equal(5);
    expect({}).not.to.equal({});
    expect({}).to.eql({});
  });

  it("the proper elemnts are showing", () => {
    firstName().should("exist");
    lastName().should("exist");
    emailInput().should("exist");
    passwordInput().should("exist");
    checkboxInput().should("exist");
    submitButton().should("exist");
    cy.contains("Submit").should("exist");
  });

  describe("Filling out the inputs and cancelling", () => {
    it("can navigate tot he site", () => {
      cy.url().should("include", "localhost");
    });

    it("submit button starts out disabled", () => {
      submitButton().should("be.disabled");
    });

    it("can type in/interact with the inputs", () => {
      firstName()
        .should("have.value", "")
        .type("Daniel")
        .should("have.value", "Daniel");

      lastName()
        .should("have.value", "")
        .type("Kish")
        .should("have.value", "Kish");

      emailInput()
        .should("have.value", "")
        .type("Daniel@Daniel.com")
        .should("have.value", "Daniel@Daniel.com");

      passwordInput()
        .should("have.value", "")
        .type("12345678910")
        .should("have.value", "12345678910");

      checkboxInput().click().should("have.value", "on");
    });

    it("the submit button enables when inputs are filed", () => {
      firstName().type("Daniel");
      lastName().type("Kish");
      emailInput().type("Daniel@Daniel.com");
      passwordInput().type("12345678910");
      checkboxInput().click();
      submitButton().should("not.be.disabled");
    });

    it("the submit button is disabled when some inputs are left empty", () => {
      firstName().type("Daniel");
      lastName().should("have.value", "");
      emailInput().type("Daniel@Daniel.com");
      passwordInput().type("12345678910");
      checkboxInput().click();
      submitButton().should("be.disabled");
    });
  });
});
//danger zone
