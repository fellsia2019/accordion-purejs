class Accordion {
  // private
  _callStack = null
  _maxHeight = ''

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
  }

  init() {
    this.btn = this.accordionBlock.querySelector(this.selectors.accordionBtn);
    this.body = this.accordionBlock.querySelector(this.selectors.accordion);

    this.initSettings()
    this.initEvents()
  }

  initEvents() {
    this.btn.addEventListener('click', ()=> this.onToggle());
    window.addEventListener('resize', ()=> this.initSettings())
  }

  initSettings() {
    const _isOpen = this.isOpen
    this.body.style.transition = 'none'
    this.body.style.maxHeight = ''
    this.open()
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
  }
  
  constructor(settings) {
    if (settings && settings.selectors) {
      this.settings = settings
    }

    this.init(document)
  }

  init(content) {
    const accordionBlockNodelist = content.querySelectorAll(this.settings.selectors.accordionBlock)

    if (!accordionBlockNodelist || !accordionBlockNodelist.length) return

    accordionBlockNodelist.forEach(item => {
      const accordions = item.querySelectorAll(this.settings.selectors.accordionItem);

      if (!accordions || !accordions.length) return

      accordions.forEach(el => {
        new Accordion({
          accordionBlock: el,
          parrentNode: item,
          options: this.settings.options,
          selectors: this.settings.selectors
        })

        const accordionsNextlevelContent = el.querySelector(this.settings.selectors.accordion)
        if (!accordionsNextlevelContent) return

        this.init(accordionsNextlevelContent)
      })

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
    }
  }
  new AccordionDefined(settings)
})()


