class Accordion {
  // private
  _callStack = null
  _maxHeight = ''
  _isOpenBeforeDestroy = false
  accordionBlock = null
  btn = null
  body = null
  parrentNode = null
  options = {
    transition: {
      transitionDuration: 0,
      transitionFunction: ''
    },
    scrollToOpened: false,
    closeAll: false
  }
  selectors = {
    accordionBlock: null,
    accordionItem: null,
    accordion: null,
    accordionBtn: null
  }

  constructor(properties = {
    accordionBlock: null,
    parrentNode: null,
    options: null,
    selectors: {
      accordionBlock: null,
      accordionItem: null,
      accordion: null,
      accordionBtn: null
    }
  }) {
    if (!properties || !Object.values(properties).filter(item => Boolean(item)).length) {
      throw new Error('Properties must be defined!')
    }
    this.accordionBlock = properties.accordionBlock
      
    if (!properties.accordionBlock || !(properties.accordionBlock instanceof HTMLElement)) {
      throw new Error('accordionBlock must be defined and must be instanceof HTMLElement')
    }

    this.parrentNode = properties.parrentNode

    if (properties.options) {
      this.options = properties.options
    }

    if (properties.selectors) {
      this.selectors = properties.selectors
    }

    this.init()
    this.initEvents()
  }

  init(isOpen = this.isOpen) {
    this.btn = this.accordionBlock.querySelector(this.selectors.accordionBtn);
    this.body = this.accordionBlock.querySelector(this.selectors.accordion);
    this.initSettings(isOpen)
  }

  initEvents() {
    this.btn.addEventListener('click', this.onToggle.bind(this));
  }

  removeEvent() {
    this.btn.removeEventListener('click', this.onToggle.bind(this));
  }

  destroy() {
    this._isOpenBeforeDestroy = this.isOpen
    this.body.style.transition = 'none'
    this.body.style.maxHeight = ''
    this.body.style.padding = ''
    this.body.style.margin = ''
  }

  initSettings(isOpen = this.isOpen) {
    const _isOpen = isOpen
    this.body.style.transition = 'none'
    this.body.style.maxHeight = ''
    this._maxHeight = `${this.body.getBoundingClientRect().height}px`
    this.close()

    if (_isOpen) {
      this.open()
      this.clearAfterAnimate()
    }

    setTimeout(() => {
      this.body.style.transition = `all ${this.options.transition.transitionDuration/1000}s ${this.options.transition.transitionFunction}`
    });
  }

  get isOpen() {
    return this.accordionBlock.classList.contains('is-opened')
  }

  afterAnimate(fn) {
    this._callStack = setTimeout(fn.bind(this), this.options.transition.transitionDuration );
  }

  clearAfterAnimate() {
    clearTimeout(this._callStack)
  }
  
  scrollToOpened() {
    const scrollY = window.scrollY + this.accordionBlock.getBoundingClientRect().top
  
    window.scrollTo({
      top: scrollY,
      behavior: "smooth"
    })
  }

  open(el = this.body) {
    el.style.maxHeight = this._maxHeight
    el.style.padding = ''
    el.style.margin = ''
    const accordionBlock = el.closest(this.selectors.accordionItem)
    accordionBlock.classList.add('is-opened')

    if (this.options.scrollToOpened) {
      this.afterAnimate(this.scrollToOpened)
    }
  }
  
  close(el = this.body) {
    el.style.maxHeight = '0px'
    el.style.padding = '0px'
    el.style.margin = '0px'
    const accordionBlock = el.closest(this.selectors.accordionItem)
    accordionBlock.classList.remove('is-opened')

    if (this.options.scrollToOpened) {
      this.clearAfterAnimate()
    }
  }

  onToggle() {
    const accordionItems = this.parrentNode.querySelectorAll(this.selectors.accordion)
   
    if (this.options.closeAll) {
      accordionItems.forEach(el => {
        if (el !== this.body) {
          this.close(el)
        }
      })
    }

    if (this.isOpen) {
      this.close()
    } else {
      this.open()
    }
  }
}

class AccordionDefined {
  settings = {
    selectors: {
      accordionBlock: '',
      accordionItem: '',
      accordion: '',
      accordionBtn: ''
    },
    options: {
      transition: {
        transitionDuration: 0,
        transitionFunction: ''
      },
      scrollToOpened: false
    },
    context: document,
  }

  accordions = []
  
  constructor(settings) {
    if (settings && settings.selectors) {
      this.settings = settings
    }

    this.init(this.settings.context || document)
  }

  getFilteredAccordion(accordions, content) {
    const accordionBody = content.querySelector(this.settings.selectors.accordion)

    return Array.from(accordions)
      .filter(accordion => {
        const intoAccordion = accordion.closest(this.settings.selectors.accordion)
          && accordionBody === accordion.closest(this.settings.selectors.accordion)
        if (!intoAccordion) return accordion
      })
  }

  init(content) {
    const accordionBlockNodelist = content.querySelectorAll(this.settings.selectors.accordionBlock)
    
    if (!accordionBlockNodelist || !accordionBlockNodelist.length) return
    
    const accordionBlocks = this.getFilteredAccordion(accordionBlockNodelist, content)

    accordionBlocks.forEach(item => {
      const accordionsNodeList = item.querySelectorAll(this.settings.selectors.accordionItem);
      if (!accordionsNodeList || !accordionsNodeList.length) return

      const accordions = this.getFilteredAccordion(accordionsNodeList, content)

      accordions.forEach(el => {
        const AccordionInstance = new Accordion({
          accordionBlock: el,
          parrentNode: item,
          options: this.settings.options,
          selectors: this.settings.selectors,
        })

        this.accordions.push(AccordionInstance)

        const accordionsNextlevelContent = el.querySelector(this.settings.selectors.accordion)
        if (accordionsNextlevelContent) {
          this.init(accordionsNextlevelContent)
        }

      })
    })

    window.addEventListener('resize', this.reInit.bind(this))
    window.addEventListener('reinitAccordion', this.reinitAccordion.bind(this))
  }

  reinitAccordion() {
    setTimeout(() => {
      this.reInit.bind(this)()
    }, 10);
  }

  destroy() {
    window.removeEventListener('resize', this.reInit.bind(this))
    window.removeEventListener('reinitAccordion', this.reinitAccordion.bind(this))
    this.accordions
      .map(accordion => {
        accordion.destroy()
        accordion.removeEvent()
        return accordion
      })
  }

  reInit() {
    this.accordions
      .map(accordion => {
        accordion.destroy()
        return accordion
      })
      .forEach(accordion => {
        accordion.initSettings(accordion._isOpenBeforeDestroy)
      })
  }
}

(()=> {
  const settings = {
    selectors: {
      accordionBlock: '[data-accordion-block]',
      accordionItem: '[data-accordion]',
      accordion: '[data-accordion-content]',
      accordionBtn: '[data-accordion-btn]'
    },
    options: {
      transition: {
        transitionDuration: 500,
        transitionFunction: 'ease'
      },
      scrollToOpened: false,
      closeAll: false,
    },
    context: document,
  }

  window.defaultAccordionSettings = settings
  new AccordionDefined(settings)
})()