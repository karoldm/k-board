import { useMemo, useState } from 'react'

import { useProjectRespository } from '../../../data/repositories/projectRepository'
import { Grid } from '../../components/Layouts/Grid'
import { debounce } from '../../utils/debounce'
import { NavBar } from './components/NavBar'
import { ProjectList } from './components/ProjectsList'
import { Wrapper } from './style'

export const Home = () => {
  const [pageOwner, setPageOwner] = useState(0)
  const [pageParticipation, setPageParticipation] = useState(0)
  const [searchText, setSearchText] = useState('')
  const [filter, setFilter] = useState('')

  const { getProjectsOwnerQuery, getProjectsParticipationQuery } =
    useProjectRespository({
      projectsPage: pageOwner,
      projectsParticipationPage: pageParticipation,
      filter,
    })

  const {
    data: projectsOwner,
    isLoading: isLoadingOwner,
    isFetching: isFetchingOwner,
  } = getProjectsOwnerQuery

  const {
    data: projectsParticipation,
    isLoading: isLoadingParticipation,
    isFetching: isFetchingParticipation,
  } = getProjectsParticipationQuery

  // it persists the timeout of debouncer between renders
  const debouncedSetFilter = useMemo(
    () =>
      debounce({
        fn: (value: string) => setFilter(value),
      }),
    []
  )

  const onFilter = (value: string) => {
    setSearchText(value)
    debouncedSetFilter(value)
  }

  return (
    <Wrapper>
      <NavBar text={searchText} onChange={onFilter} />
      <Grid columns='1fr 1fr' rows='auto'>
        <ProjectList
          isOwner={true}
          data={projectsOwner}
          isFetching={isFetchingOwner}
          isLoading={isLoadingOwner}
          onPageChange={(newPage) => {
            setPageOwner(newPage)
          }}
          page={pageOwner}
        />
        <ProjectList
          isOwner={false}
          data={projectsParticipation}
          isFetching={isFetchingParticipation}
          isLoading={isLoadingParticipation}
          onPageChange={(newPage) => {
            setPageParticipation(newPage)
          }}
          page={pageParticipation}
        />
      </Grid>
    </Wrapper>
  )
}
