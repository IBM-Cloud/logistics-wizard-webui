import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import StormCard from './StormCard';

const setup = () => {
  const spies = {
  };
  const props = {
    storm: {
      event: {
        area_id: 'CAZ048',
        pil: 'NPW',
        msg_type: 'Update',
        event_desc: 'Snow Storm',
        office_st_cd: 'VA',
        expire_time_gmt: 1467255600,
        urgency_cd: 2,
        effective_dt_tm_tz_abbrv: null,
        msg_type_cd: 2,
        office_cntry_cd: 'US',
        st_name: 'Virginia',
        severity: 'Moderate',
        flood: null,
        expire_dt_tm_local: '2016-06-29T20:00:00-07:00',
        issue_dt_tm_local: '2016-06-27T04:38:50-07:00',
        lon: -77.03,
        severity_cd: 3,
        area_type: 'Z',
        source: 'National Weather Service',
        response_types: [
          {
            response_type: 'Execute',
            response_type_cd: 4,
          },
        ],
        significance: 'Y',
        proc_dt_tm_tz_abbrv: 'EST',
        headline_text: 'Heavy snow fall thru next week',
        onset_dt_tm_local: null,
        cntry_cd: 'US',
        area_name: 'DC Area',
        onset_dt_tm_tz_abbrv: null,
        detail_key: 'cf63821f-9521-3f27-92ec-e1562ccd469b',
        proc_dt_tm_local: '2016-06-27T04:38:58-07:00',
        key: 'cf63821f-9521-3f27-92ec-e1562ccd469b',
        office_cd: 'KSGX',
        lat: 38.89,
        class: 'bulletin',
        categories: [
          {
            category: 'Met',
            category_cd: 2,
          },
        ],
        issue_dt_tm_tz_abbrv: 'EST',
        st_cd: 'VA',
        office_name: 'Arlington',
        phenomena: 'HT',
        effective_dt_tm_local: null,
        certainty: 'Likely',
        certainty_cd: 2,
        cntry_name: 'UNITED STATES OF AMERICA',
        identifier: 'e234b6f889bf9a91c5d9f309db63eaa0',
        etn: '0003',
        expire_dt_tm_tz_abbrv: 'EST',
        urgency: 'Expected',
        disclaimer: null,
      },
      demoGuid: 'JDJhJDEwJG1OUUY5eWFwUWNLOEt0RDFNTFZ1T09NR3pwZVFTd0xZN2tpMkIyYm05WHZ4WE5iaENlSXBl',
      recommendations: [
        {
          toId: 2281,
          fromId: 1,
          estimatedTimeOfArrival: '2016-10-16T00:00:00.000Z',
          status: 'NEW',
          _id: 'd43564cc1d149b139aa032bdeebe2366',
        },
        {
          toId: 2284,
          fromId: 1,
          estimatedTimeOfArrival: '2016-10-16T00:00:00.000Z',
          status: 'NEW',
          _id: 'd43564cc1d149b139aa032bdeebe2837',
        },
      ],
    },
  };
  const component = shallow(<StormCard {...props} />);

  return { spies, props, component };
};

test.todo('write tests for StormCard once complete.');
test('(Component) Renders with expected elements', t => {
  const { component } = setup();

  t.true(component.is('Paper'),
    'is wrapped by a Paper');
});
