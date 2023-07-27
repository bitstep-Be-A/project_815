const SELFIE = "selfie";
const GROUP = "group";

class Indicator {
  left = "#selfie-select-button";
  right = "#group-select-button";
  #defaultLeftClass;
  #defaultRightClass;

  constructor() {
    this.#defaultLeftClass = $(this.left).attr("class");
    this.#defaultRightClass = $(this.right).attr("class");
  }

  #isActiveBtn(idName) {
    return (
      $(idName).hasClass("underline") &&
      $(idName).hasClass("text-main-blue")
    );
  }

  #otherBtn(idName) {
    if (idName === this.left) return this.right;
    return this.left;
  }

  #inActiveBtn(idName) {
    $(idName).removeClass("underline");
    $(idName).removeClass("text-main-blue");
  }

  #activeBtn(idName) {
    $(idName).addClass("underline");
    $(idName).addClass("text-main-blue");
  }

  onClick(idName) {
    if (this.#isActiveBtn(idName)) {
      this.#inActiveBtn(idName);
      this.#activeBtn(this.#otherBtn(idName));
    } else {
      this.#activeBtn(idName);
      this.#inActiveBtn(this.#otherBtn(idName));
    }
  }

  isVisible() {
    return $("#indicator").is(":visible");
  }

  default() {
    $(this.left).attr("class", this.#defaultLeftClass);
    $(this.right).attr("class", this.#defaultRightClass);
  }

  getStatus() {
    if (this.#isActiveBtn(this.left)) {
      return SELFIE;
    } else {
      return GROUP;
    }
  }
}

class LinkItem {
  _id;
  selfie = "#selfie-item";
  group = "#group-item";
  #defaultGroupClass;
  #defaultSelfieClass;

  constructor(idName) {
    this._id = idName;
    this.#defaultSelfieClass = $(this.selfie).attr("class");
    this.#defaultGroupClass = $(this.group).attr("class");
  }

  getId() {
    return this._id;
  }

  show() {
    $(this._id).removeClass("md:flex");
    $(this._id).removeClass("hidden");
    $(this._id).addClass("flex");
  }

  disappear() {
    $(this._id).removeClass("md:flex");
    $(this._id).removeClass("flex");
    $(this._id).addClass("hidden");
  }

  default() {
    if (this._id === this.selfie) {
      $(this.selfie).attr("class", this.#defaultSelfieClass);
    }
    else if (this._id === this.group) {
      $(this.group).attr("class", this.#defaultGroupClass);
    }
  }
}

$(function () {
  const indicator = new Indicator();
  const selfieLinkItem = new LinkItem("#selfie-item");
  const groupLinkItem = new LinkItem("#group-item");

  $(indicator.left).click(() => {
    indicator.onClick(indicator.left);
    selfieLinkItem.show();
    groupLinkItem.disappear();
  });

  $(indicator.right).click(() => {
    indicator.onClick(indicator.right);
    groupLinkItem.show();
    selfieLinkItem.disappear();
  });

  $(window).on("resize", function() {
    if (indicator.isVisible()) {
      if (indicator.getStatus() === SELFIE) {
        selfieLinkItem.show();
        groupLinkItem.disappear();
      }
      else if (indicator.getStatus() === GROUP) {
        groupLinkItem.show();
        selfieLinkItem.disappear();
      }
    } else {
      indicator.default();
      selfieLinkItem.default();
      groupLinkItem.default();
    }
  });
});
