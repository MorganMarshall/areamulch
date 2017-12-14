
if ('WebSocket' in window) {
  (function() {
    function refreshCSS() {
      var sheets = [].slice.call(document.getElementsByTagName("link"));
      var head = document.getElementsByTagName("head")[0];
      for (var i = 0; i < sheets.length; ++i) {
        var elem = sheets[i];
        head.removeChild(elem);
        var rel = elem.rel;
        if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
          var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
          elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
        }
        head.appendChild(elem);
      }
    }
    var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
    var address = protocol + window.location.host + window.location.pathname + '/ws';
    var socket = new WebSocket(address);
    socket.onmessage = function(msg) {
      if (msg.data == 'reload') window.location.reload();
      else if (msg.data == 'refreshcss') refreshCSS();
    };
    console.log('Live reload enabled.');
  })();
}











function process_rect_form(form) {
  var firstvalue = 0;

  if (form.width.value == "") {
    var message = "Please fill in the width field"
    alert(message);
    form.width.focus();
    return false;
  }
  if (form.length.value == "") {
    var message = "Please fill in the length field"
    alert(message);
    form.length.focus();
    return false;
  }
  if (form.depth.value == "") {
    var message = "Please fill in the depth field"
    alert(message);
    form.depth.focus();
    return false;
  } else {

    var length = form.length.value;
    var width = form.width.value;
    var depth = form.depth.value;
    var material_conv = form.material.value

    // Multiply area by 144 to convert to square inches.
    // There are 46656 cubic inches to the cubic yard...
    // Before rounding, multiply by 100 (144 becomes 14400) to preserve 2 decimal positions.
    // After rounding, divide by 100 to restore the 2 decimal positions.
    if (material_conv == 1) {
      form.elements[6].value = "cubic yards";
    } else {
      form.elements[6].value = "tons";
    }

    form.elements[5].value = Math.round(length * width * depth * 14400 / 46656 * material_conv) / 100;

  }
  return true;
}


function process_round_form(form) {
  var firstvalue = 0;

  if (form.diameter.value == "") {
    var message = "Please fill in the diameter field"
    alert(message);
    form.width.focus();
    return false;
  }

  if (form.depth.value == "") {
    var message = "Please fill in the depth field"
    alert(message);
    form.depth.focus();
    return false;
  } else {

    var area = Math.PI * Math.pow(form.diameter.value / 2, 2);
    var depth = form.depth.value;
    var material_conv = form.material.value

    // Multiply area by 144 to convert to square inches.
    // There are 46656 cubic inches to the cubic yard...
    // Before rounding, multiply by 100 (144 becomes 14400) to preserve 2 decimal positions.
    // After rounding, divide by 100 to restore the 2 decimal positions.
    if (material_conv == 1) {
      form.elements[5].value = "cubic yards";
    } else {
      form.elements[5].value = "tons";
    }

    form.elements[4].value = Math.round(area * depth * 14400 / 46656 * material_conv) / 100;

  }
  return true;
}


function process_triangle_form(form) {
  var firstvalue = 0;

  if (form.side_one.value == "") {
    var message = "Please fill in the first side field"
    alert(message);
    form.side_one.focus();
    return false;
  }
  if (form.side_two.value == "") {
    var message = "Please fill in the second side field"
    alert(message);
    form.side_two.focus();
    return false;
  }

  if (form.depth.value == "") {
    var message = "Please fill in the depth field"
    alert(message);
    form.depth.focus();
    return false;
  } else {

    var area = (form.side_one.value * form.side_two.value) / 2;
    var depth = form.depth.value;
    var material_conv = form.material.value

    // Multiply area by 144 to convert to square inches.
    // There are 46656 cubic inches to the cubic yard...
    // Before rounding, multiply by 100 (144 becomes 14400) to preserve 2 decimal positions.
    // After rounding, divide by 100 to restore the 2 decimal positions.
    if (material_conv == 1) {
      form.elements[6].value = "cubic yards";
    } else {
      form.elements[6].value = "tons";
    }

    form.elements[5].value = Math.round(area * depth * 14400 / 46656 * material_conv) / 100;

  }
  return true;
}



function reset_round_form(form) {
  clear_form(form);
  form.elements[0].value = 0;
  form.elements[1].value = 0;
  process_round_form(form);
  return true;
}

function reset_rect_form(form) {
  clear_form(form);
  form.elements[0].value = 0;
  form.elements[1].value = 0;
  form.elements[2].value = 0;
  process_rect_form(form);
  return true;
}

function reset_triangle_form(form) {
  clear_form(form);
  form.elements[0].value = 0;
  form.elements[1].value = 0;
  form.elements[2].value = 0;
  process_triangle_form(form);
  return true;
}

function clear_form(form) {
  for (var i = 1; i <= form.count; i++) form.elements[i].value = "";
  return true;
}

