import supertest from 'supertest';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import index from '../index';

chai.use(sinonChai);
export const { expect } = chai;
export const server = supertest.agent(index);