var images

// var $loading = $('#loadingDiv').hide()
// $(document)
//   .ajaxStart(function () {
//     $loading.show()
//   })
//   .ajaxStop(function () {
//     $loading.hide()
//   })

$(document).ready(function () {
  loadImages()
  $('body').on('click', 'img.color-trigger', function (e) {
    var color = $(this).data('color')
    $('#map').css('background-color', color)
    $('#map').css('background-url', color)
  })
})

function loadImages () {
  $.ajax({
    global: false,
    url: '/StilShade/assets/js/data.json',
    dataType: 'json',
    success: function (data) {
      images = data
      createSwatches(data.images)
    },
    error: function (err) {
      alert(err)
    }
  })
}

function createSwatches (images) {
  var container = document.getElementById('swatchContainer')
  $.each(images, function (key, value) {
    var template = createSwatchDom(value)
    $(container).append(template)
  })

  var spacer = '<div class="empty-space80"></div> '

  $(container).append(spacer)
}

function createSwatchDom (swatch) {
  var template = `
   <div class="thumbnails-box">
      <img class="color-trigger" src="/StilShade/assets/images/${swatch.url}"
      data-color="${swatch.color}" data-category="${swatch.collection}"
       alt="${swatch.url}">
   </div>
  `

  return template
}
