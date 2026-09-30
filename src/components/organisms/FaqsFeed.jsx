import React, { useState } from 'react'

import Accordeon from '../atoms/Accordeon'

function FaqsFeed({
  faqsType,
  list
}) {
  const [allItems, setAllItems] = useState(false)

  return (
    <div className={`mc-faqs-container mc-faqs-container-type-${faqsType}`}>
      {list.map((faq, index) => {
        return (
          <Accordeon
            key={index}
            id={faq.id}
            title={faq.title}
            content={faq.content}
            setAllItems={setAllItems}
            allItems={allItems}
          />
        )
      })}
    </div>
  )
}

export default FaqsFeed