import React from 'react';

import { Issue, Repo } from '^/client/types';
import { SpacedGroup } from '../../node_modules/@dabapps/roe';

interface OwnProps {
  issue: Issue;
}

type Props = OwnProps;

const IssueItem = ({issue}: Props) => (
  <li key={issue.id}>
    <SpacedGroup>
      <a href={issue.html_url}>
        {issue.title}
      </a>
      {
        issue.pull_request && (
          <span className="font-size-small">
            (Pull request)
          </span>
        )
      }
    </SpacedGroup>
  </li>
);

export default IssueItem;
