import { useState } from 'react'
import { IconButton, InputBase, Paper } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'

export const Search = ({ articles, onSearch }) => {
  const [searchValue, setSearchValue] = useState('')

  const handleSearch = (event) => {
    const value = event.target.value
    setSearchValue(value)
    const filteredArticles = articles.filter((article) =>
      article.title.toLowerCase().includes(value.toLowerCase())
    )
    if (filteredArticles.length === 0 || value === '') {
      onSearch(articles)
    } else {
      onSearch(filteredArticles)
    }
  }

  return (
    <Paper
      component="form"
      className="px-[2px] py-[4px] flex items-center mt-5"
      elevation={2}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Article"
        inputProps={{ 'aria-label': 'search google maps' }}
        value={searchValue}
        onChange={handleSearch}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}
