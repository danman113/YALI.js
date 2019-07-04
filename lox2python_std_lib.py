import sys
import time

def readFile(c, filename):
  file = open(filename, "r")
  return file.read()

def clock(c):
  return time.time()

__lox2python__cache = []
def getc(c):
  if (len(__lox2python__cache) <= 0):
    for input in sys.stdin:
      __lox2python__cache.extend([ord(char) for char in input])
  # print cache
  return __lox2python__cache.pop(0) if len(__lox2python__cache) > 0 else -1

class lox2python__LoxEnvironment:
  def __init__(self, enclosing = None):
    self.map = dict()
    self.enclosing = enclosing
  def pop(self):
    # print self, self.enclosing
    return self.enclosing
  def get(self, valname):
    if valname in self.map:
      return self.map[valname]
    if self.enclosing is not None:
      return self.enclosing.get(valname)
    raise Exception('Undefined variable ' + valname)

  def declare(self, valname, value = None):
    if valname in self.map:
      raise Exception('Undefined variable ' + valname)
    self.map[valname] = value
    return self.map[valname]

  def assign(self, valname, value):
    if valname not in self.map:
      if self.enclosing is not None:
        return self.enclosing.assign(valname, value)
      raise Exception('Undefined variable ' + valname)
    self.map[valname] = value
    return self.map[valname]

lox2python__closure = lox2python__LoxEnvironment()

class lox2python__LoxFunction():
  def __init__(self, func, closure):
    self.func = func
    self.closure = closure
  def __call__(self, *args):
    global lox2python__closure
    oldEnv = lox2python__closure
    retval = self.func(lox2python__LoxEnvironment(self.closure), *args)
    lox2python__closure = oldEnv
    return retval

lox2python__closure.declare('readFile', lox2python__LoxFunction(readFile, lox2python__closure))
lox2python__closure.declare('clock', lox2python__LoxFunction(clock, lox2python__closure))
lox2python__closure.declare('getc', lox2python__LoxFunction(getc, lox2python__closure))
lox2python__closure.declare('chr', chr)
lox2python__closure.declare('exit', exit)

