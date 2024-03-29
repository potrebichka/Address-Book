// Business logic for AddressBook ------------
function AddressBook(i, type) {
  this.contacts = [],
  this.currentId = i,
  this.type = type
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId+=3;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i < this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i = 0; i < this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

function Address(street, city, state, country){
  this.street = street;
  this.city = city;
  this.country = country;
  this.state = state;
}

Address.prototype.getAddress = function(){
  if (this.state) {
    var formatted = (this.street + "<br>" + this.city + ", " + this.state + ", " + this.country);
    return formatted;
  } else {
    var formatted = (this.street + "<br>" + this.city + ", " + this.country);
    return formatted;
  }
}

// Business logic for Contacts ------------------
function Contact(firstName, lastName, phoneNumber, emails, workAddress, homeAddress) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber,
  this.emails = emails,
  this.workAddress = workAddress,
  this.homeAddress = homeAddress
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// User Interface logic
var friendsAddressBook = new AddressBook(0, "friends");
var coWorkersAddressBook = new AddressBook(1, "co-workers");
var acquaintancesAddressBook = new AddressBook(2, "acquaintances");



function displayContactDetails(addressBookToDisplay) {
  //$("ul").hide();
  var contactList = $("ul#" + addressBookToDisplay.type + "-contacts");
  console.log(contactList);
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactList.html(htmlForContactInfo);
  contactList.show();
};

function showContact(contactId, addressBook) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").fadeIn(250);
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  if (contact.emails) {
    $(".emails").html(contact.emails.join(", "));
  }
  $(".work-address").html(contact.workAddress);
  $(".home-address").html(contact.homeAddress);

  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + contact.id + ">Delete</button>");
};

var clicked = false;
var addressBook = friendsAddressBook;

function attachContactListeners() {

  // $("#chooseTypeOfBook").click(function() {
  //   var selectedTypeOfBook = $("#typeOfAddressBook").val();
  //   switch (selectedTypeOfBook) {
  //     case "1":
  //       addressBook = friendsAddressBook;
  //       break;
  //     case "2":
  //       addressBook = coWorkersAddressBook;
  //       break;
  //     case "3":
  //       addressBook = acquaintancesAddressBook;
  //       break;
  //   };
  // });

  $("#typeOfAddressBook").change(function() {
    var selectedTypeOfBook = $("#typeOfAddressBook").val();
    switch (selectedTypeOfBook) {
      case "1":
        addressBook = friendsAddressBook;
        break;
      case "2":
        addressBook = coWorkersAddressBook;
        break;
      case "3":
        addressBook = acquaintancesAddressBook;
        break;
    };
  });


  $("button#add-new-email").click(function(){
    if (emailCounter < 4) {
      emailCounter += 1;
      $("#new-email" + emailCounter).show();
    }
  });

  $("ul").on("mouseenter", "li", function() {
      $(this).addClass("hovered");
      showContact(this.id, addressBook);
  }).on("click", "li", function(){
    clicked = true;
  }).mouseleave(function(){
    $(this).removeClass("hovered");
    if (!clicked) {
      $("#show-contact").hide();
    }
    clicked = false;
  });


  $("#buttons").on("click", ".deleteButton", function(){
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });

  $("#chooseTypeOfDisplayedBook").click(function() {
    var typeOfDisplayedAddressBook = $("#typeOfDisplayedAddressBook").val();
    switch (typeOfDisplayedAddressBook) {
      case "1":
        addressBook = friendsAddressBook;
        break;
      case "2":
        addressBook = coWorkersAddressBook;
        break;
      case "3":
        addressBook = acquaintancesAddressBook;
        break;
    }
    $("ul").hide();
    displayContactDetails(addressBook);
  })
};

var emailCounter = 1;

function resetFields() {
  $("input#new-first-name").val("");
  $("input#new-last-name").val("");
  $("input#new-phone-number").val("");
  for (var i=1; i <= 4; i++) {
    $("input#new-email" + i).val("");
  }
  emailCounter = 1;
  $(".additionalEmail").hide();
  $("input#new-home-street").val("");
  $("input#new-home-city").val("");
  $("input#new-home-state").val("");
  $("input#new-home-country").val("");
  $("input#new-work-street").val("");
  $("input#new-work-city").val("");
  $("input#new-work-state").val("");
  $("input#new-work-country").val("");

}

$(function() {
  attachContactListeners();

  var addressOne;
  var addressTwo;

  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    console.log(this.addressBook);
    var inputtedFirstName = $("#new-first-name").val();
    var inputtedLastName = $("#new-last-name").val();
    var inputtedPhoneNumber = $("#new-phone-number").val();

    var workStreet = $("#new-work-street").val();
    var workCity = $("#new-work-city").val();
    var workState = $("#new-work-state").val();
    var workCountry = $("#new-work-country").val();

    var homeStreet = $("#new-home-street").val();
    var homeCity = $("#new-home-city").val();
    var homeState = $("#new-home-state").val();
    var homeCountry = $("#new-home-country").val();

    addressOne = new Address(workStreet, workCity, workState, workCountry);
    addressTwo = new Address(homeStreet, homeCity, homeState, homeCountry);

    var inputtedWorkAddress = addressOne.getAddress();
    var inputtedHomeAddress = addressTwo.getAddress();

    var inputtedEmails = [];
    for (var i=1; i <= 4; i++) {
      var inputtedEmail = $("#new-email" + i).val();

      if (inputtedEmail !== "") {
        inputtedEmails.push(inputtedEmail);
      }
    }

    //resetting fields
    resetFields();

    var newContact = new Contact (inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmails, inputtedWorkAddress, inputtedHomeAddress);
    addressBook.addContact(newContact);
    //displayContactDetails(addressBook);
    console.log(addressBook);
  });
})
