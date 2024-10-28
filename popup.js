document.getElementById('printTabs').addEventListener('click', async () => {
  try {
    let tabs = await chrome.tabs.query({});
    tabs.forEach((tab) => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: printAndClosePage
      });
    });
  } catch (error) {
    console.error('Failed to print tabs:', error);
  }
});

function printAndClosePage() {
  const beforePrint = () => {
    console.log('Printing...');

    // Change hex code colors for better print results
    document.querySelectorAll('*').forEach(element => {
      // Change hex code color #f5f5f5 to #ffffff
      if (window.getComputedStyle(element).color === 'rgb(245, 245, 245)') {
        element.style.color = '#ffffff';
      }
      if (window.getComputedStyle(element).backgroundColor === 'rgb(245, 245, 245)') {
        element.style.backgroundColor = '#ffffff';
      }

      // Change hex code color #f8f8f8 to #ffffff
      if (window.getComputedStyle(element).color === 'rgb(248, 248, 248)') {
        element.style.color = '#ffffff';
      }
      if (window.getComputedStyle(element).backgroundColor === 'rgb(248, 248, 248)') {
        element.style.backgroundColor = '#ffffff';
      }

      // Change hex code color #e8e8e8 to #ffffff
      if (window.getComputedStyle(element).color === 'rgb(232, 232, 232)') {
        element.style.color = '#ffffff';
      }
      if (window.getComputedStyle(element).backgroundColor === 'rgb(232, 232, 232)') {
        element.style.backgroundColor = '#ffffff';
      }

      // Change hex code color #121212 to #ffffff
      if (window.getComputedStyle(element).color === 'rgb(18, 18, 18)') {
        element.style.color = '#ffffff';
      }
      if (window.getComputedStyle(element).backgroundColor === 'rgb(18, 18, 18)') {
        element.style.backgroundColor = '#ffffff';
      }

      // Change hex code color #ececec to #ffffff
      if (window.getComputedStyle(element).color === 'rgb(236, 236, 236)') {
        element.style.color = '#ffffff';
      }
      if (window.getComputedStyle(element).backgroundColor === 'rgb(236, 236, 236)') {
        element.style.backgroundColor = '#ffffff';
      }

      // Change hex code color #f2f2f2 to #ffffff
      if (window.getComputedStyle(element).color === 'rgb(242, 242, 242)') {
        element.style.color = '#ffffff';
      }
      if (window.getComputedStyle(element).backgroundColor === 'rgb(242, 242, 242)') {
        element.style.backgroundColor = '#ffffff';
      }

      // Change hex code color #f7f7f7 to #ffffff
      if (window.getComputedStyle(element).color === 'rgb(247, 247, 247)') {
        element.style.color = '#ffffff';
      }
      if (window.getComputedStyle(element).backgroundColor === 'rgb(247, 247, 247)') {
        element.style.backgroundColor = '#ffffff';
      }

      // Change hex code color #747474 to #000000
      if (window.getComputedStyle(element).color === 'rgb(116, 116, 116)') {
        element.style.color = '#000000';
      }
      if (window.getComputedStyle(element).backgroundColor === 'rgb(116, 116, 116)') {
        element.style.backgroundColor = '#000000';
      }

      // Change hex code color #6f6f6f to #000000 (as text color only)
      if (window.getComputedStyle(element).color === 'rgb(111, 111, 111)') {
        element.style.color = '#000000';
      }
    });
  };

  const afterPrint = () => {
    chrome.runtime.sendMessage({ message: 'closeTab' });
  };

  // Scroll to the bottom of the page to ensure lazy-loaded content is loaded
  const scrollToBottom = () => {
    return new Promise((resolve) => {
      let distance = 100;
      let totalHeight = document.body.scrollHeight;
      let scrollHeight = 0;

      const scroll = () => {
        scrollHeight += distance;
        window.scrollBy(0, distance);

        if (scrollHeight >= totalHeight) {
          resolve();
        } else {
          requestAnimationFrame(scroll);
        }
      };
      
      scroll();
    });
  };

  window.addEventListener('beforeprint', beforePrint);
  window.addEventListener('afterprint', afterPrint);

  // Scroll to the bottom and then print
  scrollToBottom().then(() => {
    window.print();
  });
}
