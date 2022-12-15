function init(onlyRessetings = false) {
  const accordionBlockNodelist = document.querySelectorAll('[data-accordion-block]')

  accordionBlockNodelist.forEach((accardionBlockNode)=> {
    const accordion = accardionBlockNode.querySelectorAll('[data-accordion]')

    accordion.forEach((item)=> {
      const header = item.querySelector('[data-accordion-btn]')
      const body = item.querySelector('[data-accordion-content]')

      setPreset(body)

      if (!onlyRessetings)
        header.addEventListener('click', ()=> toggleAccordion(body, accardionBlockNode))
    })
  })
}

function setPreset(body) {
  body.style.transition = 'none'
  body.style.maxHeight = ''
  body.classList.remove('accordion-item__body--is-hidden')
  body.style.maxHeight = `${body.getBoundingClientRect().height}px`
  body.style.transition = 'none'
  body.classList.add('accordion-item__body--is-hidden')

  setTimeout(() => {
    body.style.transition = 'all 0.5s ease'
  }, 500);
}

function toggleAccordion(body, thiBlock) {
  const accordionItems = thiBlock.querySelectorAll('.accordion-item__body:not(.accordion-item__body--is-hidden)')

  body.classList.toggle('accordion-item__body--is-hidden')

  accordionItems.forEach((el) => {
    el.classList.add('accordion-item__body--is-hidden')
  })
}

init()

window.addEventListener('resize', ()=> init(true))