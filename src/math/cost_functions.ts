/* Copyright 2017 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
==============================================================================*/

import {NDArrayMath} from './math';
import {NDArray, Scalar} from './ndarray';

/**
 * An error function and its derivative.
 */
export interface ElementWiseCostFunction {
  cost<T extends NDArray>(math: NDArrayMath, x1: T, x2: T): T;
  der<T extends NDArray>(math: NDArrayMath, x1: T, x2: T): T;
  dispose(): void;
}

export class SquareCostFunc implements ElementWiseCostFunction {
  private halfOne = Scalar.new(0.5);

  cost(math: NDArrayMath, x1: NDArray, x2: NDArray): NDArray {
    const diff = math.sub(x1, x2);
    const diffSquared = math.elementWiseMul(diff, diff);
    const result = math.scalarTimesArray(this.halfOne, diffSquared);

    diff.dispose();
    diffSquared.dispose();

    return result;
  }

  der(math: NDArrayMath, x1: NDArray, x2: NDArray): NDArray {
    return math.sub(x1, x2);
  }

  dispose() {
    this.halfOne.dispose();
  }
}
