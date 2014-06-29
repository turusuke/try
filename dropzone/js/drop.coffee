class getImgColor
  constructor: (ele="#boxs",url="color.php",parallelUploads=1) ->
    @myDropzone = new Dropzone(ele,
      url: url
      parallelUploads: parallelUploads
      maxThumbnailFilesize: 1
      maxFilesize: 0.5
    )

    # プレビュー部分のテンプレートを書き換える
    @myDropzone.options.previewTemplate = """
    <div class="dz-preview dz-file-preview">
      <div class="dz-details">
        <div class="dz-filename"><span data-dz-name></span></div>
        <div class="dz-size" data-dz-size></div>
        <img data-dz-thumbnail />
      </div>
      <div class="color"></div>
      <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
    </div>
    """

    ## ファイルがアップロードし終わったら
    @myDropzone.on "complete", (file) =>
      @dropComplete(file)
      return

    ## ファイルをドラッグして、Dropzone が適応されている要素の上にカーソルが乗っているときに発火
    @myDropzone.on "dragover", =>
      @dropOver
      return


  dropComplete: (file) ->
    $(".mes").hide()
    res = JSON.parse(file.xhr.response) # xhr の結果(色情報)を JSON に

    @colorUpdate(res)
    @timeUpdate(file)

    $(".clBox").on mouseenter: ->
      dc = $(this).attr("data-color")
      $(".popup").find(".clCode").text(dc).show()
      return

    return

  dragOver: ->
    $(".preview").remove()
    $(".color").remove()
    return

  timeUpdate: (file) ->
    time = moment(file.lastModifiedDate)
    # moment.jsを使って最終更新時刻を日本語化する

    $(".filename").after("""
      <p class="lastModified">
        lastModified：#{time.format('YYYY/MM/DD dddd, h:mm:ss a')}
      </p>
      """
    )
    return

  colorUpdate: (res) ->
    i = 0
    while i < 10
      $(".color").append $.parseHTML("""
      <div class="clBox"
        data-color=#"#{res[i]}"
        style="background-color:##{res[i]}">
      </div>
      """)
      i++

    $(".color").after "<div class=\"popup\"><p class=\"clCode\"></p></div>"
    $(".dz-preview").fadeIn "500", ->
      $(".color").fadeIn "500"
      return

    return

$ ->

  moment().lang "ja"
  new getImgColor()
  return