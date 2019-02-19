import {shallow, render, mount} from 'enzyme';
import Title from './index';

export const setup = component => {
    const wrapper = shallow(component);
    return wrapper;
};

export const setupByRender = component => {
    const wrapper = render(component);
    return wrapper;
};

export const setupByMount = component => {
    const wrapper = mount(component);
    return wrapper;
};

const props = {};

describe('test title', () => {
    const wrapper = setup(<Title {...props} />);

    it('has a title named FExpy', () => {
        expect(wrapper.find('h1').text()).toBe('FExpy');
    })
});