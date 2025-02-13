import { useState } from 'react'

import { useProjectRespository } from '../../../data/repositories/projectRepository'
import { Grid } from '../../components/Layouts/Grid'
import { NavBar } from './components/NavBar'
import { ProjectList } from './components/ProjectsList'
import { Wrapper } from './style'

export const Home = () => {
  const [pageOwner, setPageOwner] = useState(0)
  const [pageParticipation, setPageParticipation] = useState(0)

  const { getProjectsOwnerQuery, getProjectsParticipationQuery } =
    useProjectRespository(pageOwner, pageParticipation)

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

  const onFilterProject = (text: string) => {}

  return (
    <Wrapper>
      <NavBar onSearchProject={(text) => onFilterProject} />
      <Grid columns='1fr 1fr' rows='auto'>
        <ProjectList
          data={projectsOwner}
          isFetching={isFetchingOwner}
          isLoading={isLoadingOwner}
          onPageChange={(newPage) => {
            setPageOwner(newPage)
          }}
          page={pageOwner}
        />
        <ProjectList
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
