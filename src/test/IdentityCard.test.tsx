import React from 'react'
import { shallow } from 'enzyme'

import IdentityCard from '../components/IdentityCard/IdentityCard'

// Unit test
describe('<IdentityCard /> tests', () => {
  it('Render with image prop and accepted', () => {
    const wrapper = shallow(
      <IdentityCard
        image={'image'}
        accepted
        onClickTakePicture={() => undefined}
      />
    )
    expect(wrapper.find('div div').hasClass('Result-button-accepted')).toBe(
      true
    )
    expect(wrapper.find('div div span').text()).toBe('ACEPTED')
  })

  it('Render with image prop and prop not accepted', () => {
    const wrapper = shallow(
      <IdentityCard
        image={'image'}
        accepted={false}
        onClickTakePicture={() => undefined}
      />
    )
    expect(wrapper.find('div div').hasClass('Result-button-rejected')).toBe(
      true
    )
    expect(wrapper.find('div div span').text()).toBe('REJECTED')
  })

  it('Render without image', () => {
    const wrapper = shallow(
      <IdentityCard accepted={false} onClickTakePicture={() => undefined} />
    )

    expect(
      wrapper
        .find('div.Identity-empty')
        .children()
        .find('div.Take-picture span')
        .text()
    ).toBe('TAKE PICTURE')
  })
})
