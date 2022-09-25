"use strict";
$(function () {
  const hamburger = $(".hamburger");
  const hamburger_content = $(".hamburger_content");

  hamburger.click(function () {
    $(this).toggleClass("is_active");
    hamburger_content.toggleClass("is_active");
  });
  hamburger.click(function () {
    $(this).removeClass("is_active");
    hamburger_content.removelass("is_active");
  });
});