// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function() {
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour

  // updates currentHour every minute
  setInterval(currentHour, 60000)
  // gets current hour in 24-hour format and reads it as an integer
  var currentHour = parseInt(dayjs().format('H'),10);
  console.log(currentHour);
  // loops through each time block element
    $('.time-block').each(function() {
      // Gets the ID of the current time block
      var blockId = $(this).attr('id');
      
      // Extracts the hour from the ID and reads as an integer
      const blockHour = parseInt(blockId.split('-')[1],10);
      
      // Compare the block hour with the current hour and adds or removes a class based on 
      // the comparison
      if (blockHour < currentHour) {
        $(this).addClass('past').removeClass('present future');
      } else if (blockHour === currentHour) {
        $(this).addClass('present').removeClass('past future');
      } else if (blockHour > currentHour) {
        $(this).addClass('future').removeClass('past present');
      }

    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. 
    const saveButton = $(this).find('.saveBtn');
      
    // Add click event listener to the save button
    saveButton.on('click', function() {
      // Get the description from the corresponding text area
      const description = $(this).siblings('.description').val();

      // Get the ID of the parent time block
      const timeBlockId = $(this).closest('.time-block').attr('id');

      // Save the description in local storage with the time block ID as the key
      localStorage.setItem(timeBlockId, description);

      const localStorageMsg = $('.localStorageMsg');

      localStorageMsg.text('"' + description + '"' + ' added to calendar');
    });

    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    var blockId = $(this).attr('id');
    const savedDescription = localStorage.getItem(blockId);
    if (savedDescription) {
      $(this).find('.description').val(savedDescription);
  }
    });

  // TODO: Add code to display the current date in the header of the page.
  setInterval(getDateAndTime, 1000);
  function getDateAndTime() {
    var today = dayjs();
    var hour = dayjs().hour();
    var min = dayjs().minute();
    var sec = dayjs().second();
    $('#currentDay').text(today.format('MMM D, YYYY') + " at " + hour + ":" + min + ":" + sec);
  }
});