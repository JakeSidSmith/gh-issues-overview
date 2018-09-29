import { ContentBox } from '@dabapps/roe';
import React from 'react';

import { Repo } from '^/client/types';

interface OwnProps {
  repo: Repo;
}

type Props = OwnProps;

const RepoItem = ({repo}: Props) => {
  const details = [];

  if (repo.permissions.admin) {
    details.push('admin');
  }

  if (repo.fork) {
    details.push('fork');
  }

  return (
    <ContentBox component="li">
      <p className="bold">
        <a href={repo.svn_url}>
          {repo.full_name}
        </a>
        {
          Boolean(details.length) && (
            <span className="margin-left-base">
              ({details.join(', ')})
            </span>
          )
        }
      </p>
    </ContentBox>
  );
};

export default RepoItem;
