import React, { useState } from 'react'

interface SearchFormProps {
  onStartQuery: (params: { length: number; extension: string }) => void
  initialValues: {
    length: number
    extension: string
  }
}

const SearchForm: React.FC<SearchFormProps> = ({ onStartQuery, initialValues }) => {
  const [length, setLength] = useState(initialValues.length)
  const [extension, setExtension] = useState(initialValues.extension)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onStartQuery({ length, extension })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex justify-between items-center mt-1'>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            <div className='filter-title mb-0 whitespace-nowrap'>长度：</div>
            <select value={length} onChange={e => setLength(Number(e.target.value))} className='search-input mb-0 w-20'>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
              <option value='7'>7</option>
            </select>
          </div>

          <div className='flex items-center gap-2'>
            <div className='filter-title mb-0 whitespace-nowrap'>后缀：</div>
            <select value={extension} onChange={e => setExtension(e.target.value)} className='search-input mb-0 w-24'>
              <option value='com'>.com</option>
              <option value='net'>.net</option>
              <option value='ai'>.ai</option>
              <option value='io'>.io</option>
              <option value='app'>.app</option>
              <option value='tech'>.tech</option>
              <option value='cc'>.cc</option>
              <option value='xyz'>.xyz</option>
              <option value='top'>.top</option>
            </select>
          </div>
        </div>

        <div className='whitespace-nowrap'>
          <button type='submit' className='btn'>
            <i className='fas fa-search mr-2'></i> 开始查询
          </button>
        </div>
      </div>
    </form>
  )
}

export default SearchForm
