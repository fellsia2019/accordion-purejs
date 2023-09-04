document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('[data-load-accordions]')
  const accordionsBlock = document.querySelector('[data-blocks]')

  btn.addEventListener('click', () => {
    fakeLoad()
      .then(data => {
        const div = document.createElement('div')
        div.innerHTML = data
        accordionsBlock.append(div)
      
        new AccordionDefined({...window.defaultAccordionSettings, context: div})
      })
  })

  async function fakeLoad() {
    const accordionHtml = `
      <h2>Загруженный аккордион: ${accordionsBlock.children.length}</h2>

      <div class="accordion" data-accordion-block>
        <div class="accordion-item" data-accordion>
          <!-- second lvl -->
          <div class="accordion-item__header" data-accordion-btn>
            <h2>with second lvl</h2>
            <div class="accordion-item__header-icon">
              <svg class="" width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 1.43408L7.5 7.56616L1 1.43408" stroke="currentColor" stroke-width="2"></path></svg>
            </div>
          </div>
          <div class="accordion-item__body" data-accordion-content>
            <div class="accordion" data-accordion-block>
              <div class="accordion-item" data-accordion>
                <div class="accordion-item__header" data-accordion-btn>
                  <h2>lorem 1</h2>
                  <div class="accordion-item__header-icon">
                    <svg class="" width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 1.43408L7.5 7.56616L1 1.43408" stroke="currentColor" stroke-width="2"></path></svg>
                  </div>
                </div>
                <div class="accordion-item__body" data-accordion-content>
                  <p class="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, magni repudiandae. Perspiciatis deleniti alias modi, dicta dolorem sed quidem consequuntur.</p>
                </div>
              </div>
              <div class="accordion-item" data-accordion>
                <div class="accordion-item__header" data-accordion-btn>
                  <h2>lorem 2</h2>
                  <div class="accordion-item__header-icon">
                    <svg class="" width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 1.43408L7.5 7.56616L1 1.43408" stroke="currentColor" stroke-width="2"></path></svg>
                  </div>
                </div>
                <div class="accordion-item__body" data-accordion-content>
                  <p class="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, magni repudiandae. Perspiciatis deleniti alias modi, dicta dolorem sed quidem consequuntur.</p>
                  <p class="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, magni repudiandae. Perspiciatis deleniti alias modi, dicta dolorem sed quidem consequuntur.</p>
                  <p class="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, magni repudiandae. Perspiciatis deleniti alias modi, dicta dolorem sed quidem consequuntur.</p>
                </div>
              </div>
              <div class="accordion-item" data-accordion>
                <div class="accordion-item__header" data-accordion-btn>
                  <h2>lorem 3</h2> 
                  <div class="accordion-item__header-icon">
                    <svg class="" width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 1.43408L7.5 7.56616L1 1.43408" stroke="currentColor" stroke-width="2"></path></svg>
                  </div>
                </div>
                <div class="accordion-item__body" data-accordion-content>
                  <p class="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, magni repudiandae. Perspiciatis deleniti alias modi, dicta dolorem sed quidem consequuntur.</p>
                  <p class="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, magni repudiandae. Perspiciatis deleniti alias modi, dicta dolorem sed quidem consequuntur.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="accordion-item" data-accordion>
          <div class="accordion-item__header" data-accordion-btn>
            <h2>lorem 1</h2>
            <div class="accordion-item__header-icon">
              <svg class="" width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 1.43408L7.5 7.56616L1 1.43408" stroke="currentColor" stroke-width="2"></path></svg>
            </div>
          </div>
          <div class="accordion-item__body" data-accordion-content>
            <p class="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, magni repudiandae. Perspiciatis deleniti alias modi, dicta dolorem sed quidem consequuntur.</p>
          </div>
        </div>
        <div class="accordion-item" data-accordion>
          <div class="accordion-item__header" data-accordion-btn>
            <h2>lorem 2</h2>
            <div class="accordion-item__header-icon">
              <svg class="" width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 1.43408L7.5 7.56616L1 1.43408" stroke="currentColor" stroke-width="2"></path></svg>
            </div>
          </div>
          <div class="accordion-item__body" data-accordion-content>
            <p class="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, magni repudiandae. Perspiciatis deleniti alias modi, dicta dolorem sed quidem consequuntur.</p>
            <p class="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, magni repudiandae. Perspiciatis deleniti alias modi, dicta dolorem sed quidem consequuntur.</p>
            <p class="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, magni repudiandae. Perspiciatis deleniti alias modi, dicta dolorem sed quidem consequuntur.</p>
          </div>
        </div>
        <div class="accordion-item" data-accordion>
          <div class="accordion-item__header" data-accordion-btn>
            <h2>lorem 3</h2> 
            <div class="accordion-item__header-icon">
              <svg class="" width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 1.43408L7.5 7.56616L1 1.43408" stroke="currentColor" stroke-width="2"></path></svg>
            </div>
          </div>
          <div class="accordion-item__body" data-accordion-content>
            <p class="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, magni repudiandae. Perspiciatis deleniti alias modi, dicta dolorem sed quidem consequuntur.</p>
            <p class="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, magni repudiandae. Perspiciatis deleniti alias modi, dicta dolorem sed quidem consequuntur.</p>
          </div>
        </div>
      </div>
    `

    return Promise.resolve(accordionHtml)
  }
})