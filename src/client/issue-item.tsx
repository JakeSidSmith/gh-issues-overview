import { Badge, SpacedGroup } from '@dabapps/roe';
import React from 'react';

import { Issue } from '^/client/types';

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
      {
        issue.labels.map((label) => (
          <Badge key={label.id} style={{backgroundColor: `#${label.color}`}}>
            {label.name}
          </Badge>
        ))
      }
    </SpacedGroup>
  </li>
);

export default IssueItem;
