import React, { useEffect, useState } from 'react'

import { arrNum } from '../../utils/functions'

function Input({
  type,
  label,
  text,
  placeholder,
  termsText,
  termsLink,
  onChange,
  value,
  error,
  inputByCharacter,
  maxlength,
  list,
  disabled,
}) {
  const [separatedInputs, setSeparatedInputs] = useState([])

  const onChangeSeparated = async (props) => {
    const index = Number(props.target.getAttribute('rel'))
    const cur = JSON.parse(JSON.stringify(separatedInputs))
    const newC = cur.map((item, i) => i == index ? props.target.value : item)
    setSeparatedInputs(newC)
  }

  const onInputSeparated = async (props) => {

    if (props.target.nextElementSibling) {
      props.target.nextElementSibling.focus()
    }
  }

  useEffect(() => {
    const datePick = document.querySelector('#datePickerId')
    if (datePick) {
      const todayDate = new Date('2005-01-01')
      const limitDate = new Date('1900-01-01')
      datePick.max = new Date(todayDate.setDate(todayDate.getDate() - 1)).toISOString().split("T")[0]
      datePick.min = new Date(limitDate.setDate(limitDate.getDate() - 1)).toISOString().split("T")[0]
    }

    if (inputByCharacter && separatedInputs.length === 0) {

      const arr = []
      for (let i = 0; i < arrNum(maxlength).length; i++) arr.push("")
      setSeparatedInputs(arr)
    }
  }, [])

  return (
    <div className="mc-input-container">
      <div className={`mc-input-container__box ${type} ${error ? 'mc-input-container__box--error' : ''}`}>
        <label>{label}</label>

        {type === 'code'
          ? inputByCharacter
            ? <div className='mc-input-separated-container'>
              {arrNum(maxlength).map((i) => {

                return (
                  <input
                    key={i}
                    type="text"
                    rel={i}
                    style={{ width: `${(100 / maxlength) - 2}%` }}
                    maxLength={1}
                    onChange={onChangeSeparated}
                    onInput={onInputSeparated}
                    value={separatedInputs[i] ? separatedInputs[i] : ''}
                  />
                )
              })}
            </div>
            : <input
              type="text"
              rel={type}
              placeholder={placeholder}
              onChange={onChange}
              value={value}
            />
          : type === 'document'
            ? inputByCharacter
              ? <div className='mc-input-separated-container'>
                {arrNum(maxlength).map((i) => {

                  return (
                    <input
                      key={i}
                      type="text"
                      rel={i}
                      style={{ width: `${(100 / maxlength) - 2}%` }}
                      maxLength={1}
                      onChange={onChangeSeparated}
                      onInput={onInputSeparated}
                      value={separatedInputs[i] ? separatedInputs[i] : ''}
                    />
                  )
                })}
              </div>
              : <input
                type="text"
                rel={type}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
              />
            : type === 'birthdate'
              ? <input
                type="date"
                id="datePickerId"
                rel={type}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
              />
              : type === 'terms'
                ? <>
                  <a href={termsLink} target='_blank' rel="noreferrer">{termsText}</a>
                  <input
                    type="checkbox"
                    rel={type}
                    onChange={onChange}
                    checked={value}
                  />
                  <span className="mc-input-checkbox__checkmark"></span>
                </>
                : type === 'textarea' ?
                  <textarea
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                  ></textarea>
                  :
                  type === 'emailPhone' ?
                    <input
                      type="text"
                      rel={type}
                      placeholder={placeholder}
                      onChange={onChange}
                      value={value}
                    />
                    :
                    type === 'dataUser' ?
                      <input
                        type="text"
                        rel={type}
                        placeholder={placeholder}
                        onChange={onChange}
                        value={value}
                      />
                      :
                      type === 'department' ?
                        <select disabled={disabled && true} onChange={onChange} className='selectDepartment' name="department">
                          <option selected value="" >{placeholder}</option>
                          {
                            list &&
                            list.map((item, i) => (
                              <option key={i} value={item?.dep_id}>
                                {item?.dep_name}
                              </option>
                            ))
                          }
                        </select>
                        :
                        type === 'city' ?
                          <select disabled={disabled && true} onChange={onChange} className='selectCity' name="city">
                            <option selected value="" >{placeholder}</option>
                            {
                              list &&
                              list.map((item, i) => (
                                <option key={i} value={item?.city_id}>
                                  {item?.city_name}
                                </option>
                              ))
                            }
                          </select>
                          :
                          type === 'site' ?
                          <select disabled={disabled && true} onChange={onChange} className='selectSite' name="site">
                            <option selected value="" >{placeholder}</option>
                            {
                              list &&
                              list.map((item, i) => (
                                <option key={i} value={item?.site_id}>
                                  {item?.site_name}
                                </option>
                              ))
                            }
                          </select>
                          : type === 'onlyText' && 
                          <p className='mc-form-label' dangerouslySetInnerHTML={{ __html: text }}></p>

        }

        {error &&
          <div className="mc-input-error">{error}</div>
        }
      </div>
    </div>
  )
}

export default Input