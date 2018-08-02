/* This is the spec file that Jasmine will read it contains
 * all of the tests that will be run against the application.
 */

/* All of the tests are place within the $() function,
 * since some of these tests require DOM elements.
 */
$(function() {
    // Test suite for the RSS feed variable //
    describe('RSS Feeds', function() {

        // Test if allFeeds variable exists and make sure that it is not empty.//
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test loops through each feed in the allFeeds object and ensures
         * it has a URL defined and that the URL is not empty.
         */
         it('urls defined', function() {
           for(let feed of allFeeds) {
             expect(feed.url).toBeDefined();
             expect(feed.url.length).not.toBe(0);
           }
         });


        /* Test loops through each feed in the allFeeds object and ensures
         * that it has a name defined and that the name is not empty.
         */
         it('names defined', function() {
           for(let feed of allFeeds) {
             expect(feed.name).toBeDefined();
             expect(feed.name.length).not.toBe(0);
           }
         })
    });


    // Test suite for the menu element inside the html body. //
    describe('The Menu', function() {

        // Test ensures that the menu element is hidden by default. //
        it('is hidden', function() {
           const body = document.querySelector('body');
           expect(body.classList.contains('menu-hidden')).toBe(true);
         });

         /* Test ensures the menu changes visibility when the menu icon is
          * clicked. Menu displays when clicked and hides when clicked again.
          */
          it('toggle completes', function() {
            const body = document.querySelector('body');
            const menu = document.querySelector('.menu-icon-link');

            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
          });
     });

    // Test suite for the loadFeed function //
    describe('Initial Entries', function() {

        /* Test that ensures the loadFeed function
         * is called and completes its work,
         */
         beforeEach(function(done) {
           loadFeed(0, done);
         });

         it('feeds loaded', function() {
           const feed = document.querySelector('.feed');
           expect(feed.children.length).not.toBe(0);
         });
    });

    // Test suite New Feed Selection //
    describe('New Feed Selection', function() {

        const container = document.querySelector('.feed');
        const firstFeed = [];
        const secondFeed = [];

         /* Test loads muiltiple feeds and compares content when a new
          * feed is loaded by the loadFeed functionand checks that the
          * content actually changes.
          */

       beforeEach(function(done) {
            loadFeed(0, loadFeed(1, done()));

            Array.from(container.children).forEach( function(entry) {
              firstFeed.push(entry.innerText);
          //    alert('first');
          //    console.log(firstFeed);
            });

          //loadFeed(1, done);

            Array.from(container.children).forEach( function(entry) {
              secondFeed.push(entry.innerText);
            //    alert('second');
            //    console.log(secondFeed);
            });
        });

        it('content changes', function() {
          expect(firstFeed).toEqual(secondFeed);
        });
    });

}());
