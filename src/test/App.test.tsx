import React from 'react'
import { mount } from 'enzyme'

import App from '../App'

describe('<App/> - <IdentityView/> - <IdentityCard/> integration tests', () => {
  it('App with <IdentityView />', () => {
    const wrapper = mount(<App />)
    expect(wrapper.find('div.identity-card-container').length).toBe(1)

    const takePicture = wrapper.find('div.Take-picture')

    expect(takePicture.find('span').text()).toBe('TAKE PICTURE')

    /* 
      This line throw error because of CameraView need navigator access to get getUserMedia 
      from mediaDevices
    */
    takePicture.simulate('click')

    // after click render camera view
    expect(wrapper.find('CameraView').length).toBe(1)
  })
})
