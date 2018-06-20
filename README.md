# Just Wait
Wait what? The server response.

[Just Wait](https://github.com/OmarMuscatello/Just-Wait) is a lightweight jQuery utility which allows you to specify a function to be executed after a specified amount of time from the start of the AJAX request. If the AJAX requests ends before the specified amount of time, the function will never be executed.

Not clear? **Try the [**TEST TOOL**](https://omarmuscatello.github.io/Just-Wait/)**.

## Quick start
-  Add the `just-wait.min.js` file to your page.
   ```
   <script src="just-wait.min.js"></script>
   ```
-  *[Optional]* Adjust the `waitFor` parameter using `JustWait.options.waitFor` (see [Time adjusting](#time-adjusting)).
-  Add a `wait` call back to the jqXHR object.
   Example:
   ```
    $.get('url') // or $.getJSON, $.post, $.getScript, $.load, $.ajax
        .wait(() => { // <======= Wait callback
            
        })
        .done((data) => { ... })
        .fail(() => { ... })
        .always(() => { 
            // The AJAX request ends. Hide the loader.
            $loader.hide();
        });
   ```
- *[Optional]* Adjust the `waitFor` parameter only for a single request:
   ```
  $.get({ url: 'url', waitFor: 500 }) // or $.getJSON, $.post, $.getScript, $.load, $.ajax
        .wait(() => {
            
        })
        .done((data) => { ... })
        .fail(() => { ... })
        .always(() => { 
            // The AJAX request ends. Hide the loader.
            $loader.hide();
        });
   ```

## Explanation
Suppose you have to display a loader while doing an AJAX request. I'm sure you are using a code similar to

```
$loader.show(); // Show the loader before starting the AJAX request

$.get('url') // or $.post or $.ajax
    .done((data) => { ... })
    .fail(() => { ... })
    .always(() => { 
        // The AJAX request ends. Hide the loader.
        $loader.hide();
    });
```

Of course this is good: the user will see a loader while waiting for the server response. But, nowadays, most of internet connections are 100 Mbps in download and most servers can process a relatively complex request in a few moments.

This translates in completing a request a really short period of time. So, the user will see a fast show/hide of the loader, like a lighting. Of course, you won't that.

[**Just Wait**](https://github.com/OmarMuscatello/Just-Wait) solves this problem. It allows you to specify a function to be executed after a specified amount of time from the start of the AJAX request. If the AJAX requests ends before the specified amount of time, the function will never be executed.
So, the previous code could be written as:

```

$.get('url') // or $.post or $.ajax
    .wait(() => {
        // Show the loader after 100ms (default), if the request doesn't end before.
        $loader.show();
    })
    .done((data) => { ... })
    .fail(() => { ... })
    .always(() => { 
        // The AJAX request ends. Hide the loader.
        $loader.hide();
    });
```

See the below timeline to better understand how it works.

![Just Wait diagram](https://github.com/OmarMuscatello/Just-Wait/blob/master/resources/justwait-diagram.svg)

## Time adjusting
You can globally specify the amount of time to wait before the `wait` callback be executed by using the following code. Ensure that the code belowe is executed before any use of the `wait` callback.

```
JustWait.options.waitFor = 100; // Default 100ms
```

Of course, you can also specify the `waitFor` options for every request:
```
$.ajax({
        url: 'url',
        ...
        waitFor: 500 // ms
    })
    ...
```
or
```
$.get({
        url: 'url',
        ...
        waitFor: 500 // ms
    })
    ...
```
or
```
$.post({
        url: 'url',
        data: { id: 5 }
        ...
        waitFor: 500 // ms
    })
    ...
```
or [any shorthand for $.ajax](https://api.jquery.com/category/ajax/shorthand-methods/).