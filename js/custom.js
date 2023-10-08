(function() {
  var burger = document.querySelector(".burger");
  var menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", function() {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });
})();


let isCommandPressed = false;
window.addEventListener('keydown', event => {
  if (event.key === 'Meta') {
    isCommandPressed = true;
  }
})
window.addEventListener('keyup', event => {
  if (event.key === 'Meta') {
    isCommandPressed = false;
  }
})

document.querySelectorAll("#nav li").forEach(function(navEl) {
  navEl.onclick = function() {
    toggleTab(this.id, this.dataset.target);
  };

  navEl.onkeydown = function(event) {
    let isEventHandled = false;

    switch (event.key) {
      case 'Enter':
      case ' ': {
        toggleTab(this.id, this.dataset.target);
        isEventHandled = true;
        break;
      }
      case 'ArrowLeft': {
        const targetTabId = this.id === '1' ? '3' : String(Number(this.id) - 1);

        isCommandPressed
            ? toggleTab('1', document.getElementById('1').dataset.target)
            : toggleTab(targetTabId, document.getElementById(targetTabId).dataset.target);
        isEventHandled = true;
        break;
      }
      case 'ArrowRight': {
        const targetTabId = this.id === '3' ? '1' : String(Number(this.id) + 1);

        isCommandPressed
            ? toggleTab('3', document.getElementById('3').dataset.target)
            : toggleTab(targetTabId, document.getElementById(targetTabId).dataset.target);
        isEventHandled = true;
        break;
      }
      case 'Home': {
        toggleTab('1', document.getElementById('1').dataset.target);
        isEventHandled = true;
        break;
      }
      case 'End': {
        toggleTab('3', document.getElementById('3').dataset.target);
        isEventHandled = true;
        break;
      }
      default:
        break;
    }

    if (isEventHandled) {
      event.stopPropagation();
      event.preventDefault();
    }
  };
});

function toggleTab(selectedNav, targetId) {
  var navEls = document.querySelectorAll("#nav li");

  navEls.forEach(function(navEl) {
    if (navEl.id == selectedNav) {
      navEl.classList.add("is-active");
      navEl.setAttribute('aria-selected', 'true');
      navEl.focus();
    } else {
      if (navEl.classList.contains("is-active")) {
        navEl.classList.remove("is-active");
        navEl.setAttribute('aria-selected', 'false');
      }
    }
  });

  var tabs = document.querySelectorAll(".tab-pane");

  tabs.forEach(function(tab) {
    if (tab.id == targetId) {
      tab.style.display = "block";
    } else {
      tab.style.display = "none";
    }
  });
}

function focusCloseModalBtn(modalId, restoreFocusElem) {
  const closeBtn = document.querySelector(`#${modalId} .modal-close`);

  closeBtn.focus();
  closeBtn.addEventListener('click', () => {
    restoreFocusElem.focus();
  })
}

document.querySelectorAll(".button.is-link.modal-button").forEach(function(linkEl) {
  linkEl.addEventListener('click', (event) => focusCloseModalBtn(event.target.dataset.target, linkEl))
  linkEl.addEventListener('keydown', (event) => event.key === 'Enter' && focusCloseModalBtn(this.dataset.target, linkEl))
});

const dropdown = document.querySelector('.with-sublist');
const dropdownContent  = document.getElementById('services-dropdown-options');

const trapFocusInDropdown = () => {
  const options = dropdownContent.querySelectorAll('li');
  const firstOption = options[0];
  const lastOption = options[options.length - 1];

  firstOption.addEventListener('keydown', event => {
    if (event.key === 'Tab' && event.shiftKey) {
      lastOption.focus();
      event.preventDefault();
    }
  })

  lastOption.addEventListener('keydown', event => {
    if (event.key === 'Tab') {
      firstOption.focus();
      event.preventDefault();
    }
  })
}
trapFocusInDropdown()

const openDropdown = (focusLast) => {
  dropdownContent.classList.remove('hidden');
  dropdown.ariaExpanded = 'true';

  if (focusLast) {
    const options = dropdownContent.querySelectorAll('li');

    options[options.length - 1].focus();
  } else {
    dropdownContent.querySelector('li').focus();
  }
};
const closeDropdown = () => {
  dropdownContent.classList.add('hidden');
  dropdown.ariaExpanded = 'false';
  dropdown.focus();
}
const toggleDropdown = (dropdownContentId) => {
  if (dropdownContent.className.includes('hidden')) {
    openDropdown()
  } else {
    closeDropdown()
  }
}
dropdown.addEventListener('click', () => toggleDropdown())
dropdown.addEventListener('keydown', event => {
  switch (event.key) {
    case 'Enter':
    case ' ': {
      toggleDropdown();
      break;
    }

    default:
      break;
  }
})

navbarMenu.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeDropdown()
  }
})

const menuList = document.querySelector('.navbar-end');

menuList.addEventListener('keydown', event => {
  switch (event.key) {
    case 'ArrowLeft': {
      const currentItemId = event.target.parentNode.id.split('-')[1];
      const targetItemId = currentItemId === '1' ? '4' : String(Number(currentItemId) - 1);

      isCommandPressed
          ? document.querySelector(`#menu-1 button`).focus()
          : document.querySelector(`#menu-${targetItemId} button`).focus();

      break;
    }
    case 'ArrowRight': {
      const currentItemId = event.target.parentNode.id.split('-')[1];
      const targetItemId = currentItemId === '4' ? '1' : String(Number(currentItemId) + 1);

      isCommandPressed
          ? document.querySelector(`#menu-4 button`).focus()
          : document.querySelector(`#menu-${targetItemId} button`).focus();
      break;
    }
    case 'ArrowDown': {
      if (event.target.className.includes('with-sublist')) {
        openDropdown();
      }
      break;
    }
    case 'ArrowUp': {
      if (event.target.className.includes('with-sublist')) {
        openDropdown(true);
      }
      break;
    }
    case 'Home': {
      document.querySelector(`#menu-1 button`).focus();
      break;
    }
    case 'End': {
      document.querySelector(`#menu-4 button`).focus();
      break;
    }
    default:
      break;
  }
})
