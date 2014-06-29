var getImgColor;

getImgColor = (function() {
  function getImgColor(ele, url, parallelUploads) {
    if (ele == null) {
      ele = "#boxs";
    }
    if (url == null) {
      url = "color.php";
    }
    if (parallelUploads == null) {
      parallelUploads = 1;
    }
    this.myDropzone = new Dropzone(ele, {
      url: url,
      parallelUploads: parallelUploads,
      maxThumbnailFilesize: 1,
      maxFilesize: 0.5
    });
    this.myDropzone.options.previewTemplate = "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-details\">\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n    <div class=\"dz-size\" data-dz-size></div>\n    <img data-dz-thumbnail />\n  </div>\n  <div class=\"color\"></div>\n  <div class=\"dz-progress\"><span class=\"dz-upload\" data-dz-uploadprogress></span></div>\n</div>";
    this.myDropzone.on("complete", (function(_this) {
      return function(file) {
        _this.dropComplete(file);
      };
    })(this));
    this.myDropzone.on("dragover", (function(_this) {
      return function() {
        _this.dropOver;
      };
    })(this));
  }

  getImgColor.prototype.dropComplete = function(file) {
    var res;
    $(".mes").hide();
    res = JSON.parse(file.xhr.response);
    this.colorUpdate(res);
    this.timeUpdate(file);
    $(".clBox").on({
      mouseenter: function() {
        var dc;
        dc = $(this).attr("data-color");
        $(".popup").find(".clCode").text(dc).show();
      }
    });
  };

  getImgColor.prototype.dragOver = function() {
    $(".preview").remove();
    $(".color").remove();
  };

  getImgColor.prototype.timeUpdate = function(file) {
    var time;
    time = moment(file.lastModifiedDate);
    $(".filename").after("<p class=\"lastModified\">\n  lastModified：" + (time.format('YYYY/MM/DD dddd, h:mm:ss a')) + "\n</p>");
  };

  getImgColor.prototype.colorUpdate = function(res) {
    var i;
    i = 0;
    while (i < 10) {
      $(".color").append($.parseHTML("<div class=\"clBox\"\n  data-color=#\"" + res[i] + "\"\n  style=\"background-color:#" + res[i] + "\">\n</div>"));
      i++;
    }
    $(".color").after("<div class=\"popup\"><p class=\"clCode\"></p></div>");
    $(".dz-preview").fadeIn("500", function() {
      $(".color").fadeIn("500");
    });
  };

  return getImgColor;

})();

$(function() {
  moment().lang("ja");
  new getImgColor();
});
